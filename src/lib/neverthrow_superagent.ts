import type superagent from 'superagent'
import { ok, err, type Result } from 'neverthrow'

export const safeSuperagent = async (
	fn: () => Promise<superagent.Response>,
): Promise<Result<superagent.Response, SUPERAGENT_ERROR>> => {
	try {
		const res = await fn()
		return ok(res)
	} catch (e) {
		const theError = e
		if (theError instanceof Error) {
			if (safeErrStatus(theError) === 404 || theError.message.includes('404')) {
				return err({ code: 'SUPERAGENT_404', message: theError.message })
			}
			if (safeErrStatus(theError) === 500 || theError.message.includes('500')) {
				return err({ code: 'SUPERAGENT_500', message: theError.message })
			}
			if (safeErrStatus(theError) === 400 || theError.message.includes('400')) {
				return err({ code: 'SUPERAGENT_400', message: theError.message })
			}
			if (theError.message.includes('Timeout')) {
				return err({ code: 'SUPERAGENT_TIMEOUT', message: theError.message })
			}
			if (theError.message.includes('ECONNREFUSED')) {
				return err({ code: 'SUPERAGENT_CONN_REFUSED', message: theError.message })
			}
			if (theError.message.includes('ECONNABORTED')) {
				return err({ code: 'SUPERAGENT_CONN_ABORTED', message: theError.message })
			}
			if (theError.message.includes('ECONNRESET')) {
				return err({ code: 'SUPERAGENT_CONN_RESET', message: theError.message })
			}
			if (theError.message.includes('ECONNREFUSED')) {
				return err({ code: 'SUPERAGENT_CONN_REFUSED', message: theError.message })
			}
		}
		console.error(e)
		return err({ code: 'SUPERAGENT_UNKNOWN_ERROR', message: e instanceof Error ? e.message : 'Unknown error' })
	}
}

export type SUPERAGENT_ERROR_CODE =
	| 'SUPERAGENT_CONN_ABORTED'
	| 'SUPERAGENT_404'
	| 'SUPERAGENT_500'
	| 'SUPERAGENT_400'
	| 'SUPERAGENT_UNKNOWN'
	| 'SUPERAGENT_TIMEOUT'
	| 'SUPERAGENT_CONN_REFUSED'
	| 'SUPERAGENT_CONN_ABORTED'
	| 'SUPERAGENT_CONN_RESET'
	| 'SUPERAGENT_UNKNOWN_ERROR'

export type SUPERAGENT_ERROR = {
	code: SUPERAGENT_ERROR_CODE
	message: string
}

// Result type is used instead of custom union

const safeErrStatus = (e: Error): number => {
	if ('status' in e && typeof e.status === 'number') {
		return e.status
	}
	return 0
}
