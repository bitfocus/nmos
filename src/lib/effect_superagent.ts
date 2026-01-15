import { Effect, Data } from 'effect'
import superagent from 'superagent'

/**
 * Typed error classes for superagent errors
 */
export class SuperagentError extends Data.TaggedError('SuperagentError')<{
	readonly code: SuperagentErrorCode
	readonly message: string
	readonly originalError?: unknown
	readonly url?: string
}> {}

export type SuperagentErrorCode =
	| 'SUPERAGENT_404'
	| 'SUPERAGENT_500'
	| 'SUPERAGENT_TIMEOUT'
	| 'SUPERAGENT_CONN_REFUSED'
	| 'SUPERAGENT_CONN_ABORTED'
	| 'SUPERAGENT_CONN_RESET'
	| 'SUPERAGENT_ENOTFOUND'
	| 'SUPERAGENT_UNKNOWN_ERROR'

/**
 * Converts a caught error into a typed SuperagentError
 */
const toSuperagentError = (error: unknown, url?: string): SuperagentError => {
	if (error instanceof Error) {
		const message = error.message

		// Try to extract URL from superagent error if available
		let requestUrl = url
		if (!requestUrl) {
			const errorObj = error as unknown as { request?: { url?: string } }
			if (errorObj.request?.url) {
				requestUrl = errorObj.request.url
			}
		}

		if (message.includes('404')) {
			return new SuperagentError({
				code: 'SUPERAGENT_404',
				message: requestUrl ? `${message} (URL: ${requestUrl})` : message,
				originalError: error,
				url: requestUrl,
			})
		}

		if (message.includes('500')) {
			return new SuperagentError({
				code: 'SUPERAGENT_500',
				message: requestUrl ? `${message} (URL: ${requestUrl})` : message,
				originalError: error,
				url: requestUrl,
			})
		}

		if (message.includes('Timeout')) {
			return new SuperagentError({
				code: 'SUPERAGENT_TIMEOUT',
				message: requestUrl ? `${message} (URL: ${requestUrl})` : message,
				originalError: error,
				url: requestUrl,
			})
		}

		if (message.includes('ECONNREFUSED')) {
			return new SuperagentError({
				code: 'SUPERAGENT_CONN_REFUSED',
				message: requestUrl ? `${message} (URL: ${requestUrl})` : message,
				originalError: error,
				url: requestUrl,
			})
		}

		if (message.includes('ECONNABORTED')) {
			return new SuperagentError({
				code: 'SUPERAGENT_CONN_ABORTED',
				message: requestUrl ? `${message} (URL: ${requestUrl})` : message,
				originalError: error,
				url: requestUrl,
			})
		}

		if (message.includes('ECONNRESET')) {
			return new SuperagentError({
				code: 'SUPERAGENT_CONN_RESET',
				message: requestUrl ? `${message} (URL: ${requestUrl})` : message,
				originalError: error,
				url: requestUrl,
			})
		}

		if (message.includes('ENOTFOUND') || message.includes('getaddrinfo')) {
			const errorMessage = requestUrl ? `${message} (URL: ${requestUrl})` : message
			// Log DNS errors with URL for debugging
			console.error(`[SuperagentError] DNS resolution failed: ${errorMessage}`)
			return new SuperagentError({
				code: 'SUPERAGENT_ENOTFOUND',
				message: errorMessage,
				originalError: error,
				url: requestUrl,
			})
		}

		return new SuperagentError({
			code: 'SUPERAGENT_UNKNOWN_ERROR',
			message: requestUrl ? `${message} (URL: ${requestUrl})` : message,
			originalError: error,
			url: requestUrl,
		})
	}

	return new SuperagentError({
		code: 'SUPERAGENT_UNKNOWN_ERROR',
		message: 'Unknown error',
		originalError: error,
		url,
	})
}

/**
 * Extracts URL from superagent error object
 */
const extractUrlFromError = (error: unknown, fallbackUrl: string): string => {
	if (error && typeof error === 'object') {
		// Superagent errors typically have a 'request' property with the request object
		const errorObj = error as unknown as { request?: { url?: string; _url?: string } }
		if (errorObj.request) {
			const errorUrl = errorObj.request.url || errorObj.request._url
			if (errorUrl) {
				return errorUrl
			}
		}
		// Also check for direct url property (some error formats)
		if ('url' in error) {
			const errorUrl = (error as { url: string }).url
			if (errorUrl) {
				return errorUrl
			}
		}
	}
	return fallbackUrl
}

/**
 * Wraps a superagent request in an interruptible Effect.
 * When the effect is interrupted, the HTTP request is aborted via request.abort().
 *
 * @example
 * ```ts
 * const request = superagent.get('https://api.example.com/data')
 * const result = await Effect.runPromise(
 *   effectSuperagent('https://api.example.com/data', request)
 * )
 * ```
 */
export const effectSuperagent = (
	url: string,
	request: superagent.Request,
	timeout?: number,
): Effect.Effect<superagent.Response, SuperagentError> =>
	Effect.async<superagent.Response, SuperagentError>((resume, signal) => {
		// Configure and execute the request
		const req = request.disableTLSCerts().timeout(timeout ?? 10000)

		// Set up abort handler for when the effect is interrupted
		signal.addEventListener('abort', () => {
			req.abort()
		})

		// Execute the request
		req.then(
			(response) => {
				resume(Effect.succeed(response))
			},
			(error) => {
				// Don't report errors if we aborted the request
				if (signal.aborted) {
					return
				}

				const extractedUrl = extractUrlFromError(error, url)

				// Log error with URL for debugging
				const errorMessage = error instanceof Error ? error.message : String(error)
				console.error(`[SuperagentError] Request failed: ${errorMessage} (URL: ${extractedUrl})`)

				resume(Effect.fail(toSuperagentError(error, extractedUrl)))
			},
		)
	})

/**
 * Convenience method for GET requests
 * Creates the request inside the Effect
 *
 * @example
 * ```ts
 * const result = await Effect.runPromise(
 *   effectSuperagentGet('https://api.example.com/data', 5000)
 * )
 * ```
 */
export const effectSuperagentGet = (
	url: string,
	timeout?: number,
): Effect.Effect<superagent.Response, SuperagentError> => {
	const request = superagent.get(url).disableTLSCerts().accept('json')
	return effectSuperagent(url, request, timeout)
}

/**
 * Convenience method for POST requests
 * Creates the request inside the Effect
 *
 * @example
 * ```ts
 * const result = await Effect.runPromise(
 *   effectSuperagentPost('https://api.example.com/data', { key: 'value' }, 5000)
 * )
 * ```
 */
export const effectSuperagentPost = (
	url: string,
	payload: string | object | undefined,
	timeout?: number,
): Effect.Effect<superagent.Response, SuperagentError> => {
	const request = superagent.post(url).disableTLSCerts().send(payload).accept('json')
	return effectSuperagent(url, request, timeout)
}

/**
 * Convenience method for PUT requests
 * Creates the request inside the Effect
 *
 * @example
 * ```ts
 * const result = await Effect.runPromise(
 *   effectSuperagentPut('https://api.example.com/data', { key: 'value' }, 5000)
 * )
 * ```
 */
export const effectSuperagentPut = (
	url: string,
	payload: string | object | undefined,
	timeout?: number,
): Effect.Effect<superagent.Response, SuperagentError> => {
	const request = superagent.put(url).disableTLSCerts().send(payload).accept('json')
	return effectSuperagent(url, request, timeout)
}

/**
 * Convenience method for PATCH requests
 *
 * @example
 * ```ts
 * const request = superagent.patch('https://api.example.com/data').send({ key: 'value' })
 * const result = await Effect.runPromise(
 *   effectSuperagentPatch('https://api.example.com/data', request)
 * )
 * ```
 */
export const effectSuperagentPatch = (
	url: string,
	payload: string | object | undefined,
	timeout?: number,
): Effect.Effect<superagent.Response, SuperagentError> => {
	const request = superagent.patch(url).disableTLSCerts().send(payload).accept('json')
	return effectSuperagent(url, request, timeout)
}
