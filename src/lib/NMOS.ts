import { Context, Data, Effect, Ref } from 'effect'
import superagent from 'superagent'
import { z } from 'zod'
import nodeapiDevicesV12 from '../schema/is04/v1.2/zod/_devices'
import nodeapiFlowsV12 from '../schema/is04/v1.2/zod/_flows'
import nodeapiSelfV12 from '../schema/is04/v1.2/zod/_node'
import nodeapiReceiversV12 from '../schema/is04/v1.2/zod/_receivers'
import nodeapiSendersV12 from '../schema/is04/v1.2/zod/_senders'
import nodeapiSourcesV12 from '../schema/is04/v1.2/zod/_sources'
import nodeapiDevicesV13 from '../schema/is04/v1.3/zod/_devices'
import nodeapiFlowsV13 from '../schema/is04/v1.3/zod/_flows'
import nodeapiSelfV13 from '../schema/is04/v1.3/zod/_node'
import nodeapiReceiversV13 from '../schema/is04/v1.3/zod/_receivers'
import nodeapiSendersV13 from '../schema/is04/v1.3/zod/_senders'
import nodeapiSourcesV13 from '../schema/is04/v1.3/zod/_sources'
import { effectSuperagentGet, type SuperagentError } from './effect_superagent'
import { getHighestMatchingVersion } from './getHighestMatchingVersion'
import type { NMOSNodeLinkOptions } from './types'

/*
type IS04Endpoints = typeof is04endpoints
export type IS04EndpointTypes = keyof typeof is04endpoints
export type IS04EndpointType<T extends IS04EndpointTypes> = z.infer<IS04Endpoints[T]>

type IS05Endpoints = typeof is05endpoints
export type IS05EndpointTypes = keyof typeof is05endpoints
export type IS05EndpointType<T extends IS05EndpointTypes> = z.infer<IS05Endpoints[T]>
*/

/**
 * Error types for NMOS operations
 */
export class ZodError extends Data.TaggedError('ZodError')<{
	readonly message: string
	readonly issues?: z.ZodIssue[]
}> {}

export class VersionError extends Data.TaggedError('VersionError')<{
	readonly code:
		| 'VERSION_NO_MATCH'
		| 'VERSION_NOT_SUPPORTED_BY_BUTTONS'
		| 'VERSION_NOT_SUPPORTED_BY_NODE'
		| 'VERSION_UNKNOWN'
	readonly message: string
}> {}

export class IS04VersionNotSetError extends Data.TaggedError('IS04VersionNotSetError')<{
	readonly message: string
}> {}

export type SupportedVersion = 'v1.2' | 'v1.3'
export type AllUnsafeVersion = 'v1.0' | 'v1.1' | 'v1.2' | 'v1.3'

/**
 * Context for NMOSNodeApi constructor options
 */
export interface NMOSNodeApiOptionsContext {
	readonly protocol: 'http' | 'https'
	readonly host: string
	readonly port: number
	readonly basePath: string
	readonly strict: boolean
	readonly insecureHTTPParser: boolean
	readonly timeout?: number
	readonly is04Version?: SupportedVersion | 'auto'
}

export const NMOSNodeApiOptionsContext = Context.GenericTag<NMOSNodeApiOptionsContext>('NMOSNodeApiOptionsContext')

/**
 * Service interface for NMOSNodeApi
 */
export interface NMOSNodeApiService {
	readonly options: NMOSNodeApiOptionsContext
	readonly verifiedIS04Version: Ref.Ref<SupportedVersion | undefined>
}

export const NMOSNodeApiService = Context.GenericTag<NMOSNodeApiService>('NMOSNodeApiService')

/**
 * Constants for NMOS API versions
 */
export const IS04_VERSIONS_ALL: AllUnsafeVersion[] = ['v1.0', 'v1.1', 'v1.2', 'v1.3']
export const IS04_VERSIONS_SUPPORTED: SupportedVersion[] = ['v1.2', 'v1.3']
export const SupportedVersionsSchema = z.enum(['v1.2', 'v1.3'])

/**
 * Create a new NMOSNodeApi service
 */
export const makeNMOSNodeApi = (options: NMOSNodeLinkOptions): Effect.Effect<NMOSNodeApiService, never> =>
	Effect.gen(function* () {
		const verifiedIS04Version = yield* Ref.make<SupportedVersion | undefined>(undefined)
		const serviceOptions: NMOSNodeApiOptionsContext = {
			protocol: options.protocol,
			host: options.host,
			port: options.port,
			basePath: options.basePath,
			strict: options.strict,
			insecureHTTPParser: options.insecureHTTPParser ?? true,
			timeout: options.timeout ?? 10000,
			is04Version: options.is04Version,
		}

		return {
			options: serviceOptions,
			verifiedIS04Version,
		} satisfies NMOSNodeApiService
	})

/**
 * Get the verified IS04 version from the service
 */
export const getVerifiedIS04Version = (): Effect.Effect<SupportedVersion, IS04VersionNotSetError, NMOSNodeApiService> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const version = yield* Ref.get(service.verifiedIS04Version)

		if (!version) {
			return yield* Effect.fail(
				new IS04VersionNotSetError({
					message: 'IS04 version not set',
				}),
			)
		}

		return version
	})

/**
 * Set the verified IS04 version in the service
 */
export const setIS04Version = (version: SupportedVersion): Effect.Effect<void, never, NMOSNodeApiService> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		yield* Ref.set(service.verifiedIS04Version, version)
	})

/**
 * Probe and use the appropriate API version
 */
export const probeAndUseApiVersion = (): Effect.Effect<
	SupportedVersion,
	VersionError | ZodError | SuperagentError,
	NMOSNodeApiService
> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const version = service.options.is04Version

		// if the version is auto, we need to:
		// 1. probe the node for supported versions
		// 2. use the highest version we support
		// 3. set the version
		if (!version || version === 'auto') {
			const probe = yield* probeNodeApiSupport()
			const highestVersion = getHighestMatchingVersion(IS04_VERSIONS_SUPPORTED, probe)

			if (!highestVersion) {
				return yield* Effect.fail(
					new VersionError({
						code: 'VERSION_NO_MATCH',
						message: `No matching version found. Nodes versions: '${probe.join(', ')}'. Supported versions: '${IS04_VERSIONS_SUPPORTED.join(',')}'`,
					}),
				)
			}

			yield* setIS04Version(highestVersion)

			return highestVersion
		}

		// if a specific version is provided, we need to:
		// 1. check if it is supported
		// 2. set the version
		// 3. if that fails, return a helpfull error message with request version and supported versions
		const probe = yield* probeNodeApiSupport()
		const requestVersionIsSupportedByButtons = SupportedVersionsSchema.safeParse(version).success

		if (!requestVersionIsSupportedByButtons) {
			return yield* Effect.fail(
				new VersionError({
					code: 'VERSION_NOT_SUPPORTED_BY_BUTTONS',
					message: `Reqeust API-version ${version} is not recognized`,
				}),
			)
		}

		const requestedVersionIsSupportedByNode = getHighestMatchingVersion(probe, [version])

		if (!requestedVersionIsSupportedByNode) {
			return yield* Effect.fail(
				new VersionError({
					code: 'VERSION_NOT_SUPPORTED_BY_NODE',
					message: `Requested API-version ${version} is not supported by the node. The node only supports: ${probe.join(', ')}`,
				}),
			)
		}

		yield* setIS04Version(version as SupportedVersion)

		return version as SupportedVersion
	})

/**
 * Probe the node for supported API versions
 */
export const probeNodeApiSupport = (): Effect.Effect<
	AllUnsafeVersion[],
	SuperagentError | ZodError,
	NMOSNodeApiService
> =>
	Effect.gen(function* () {
		const baseUrl = yield* getBaseUrl()
		const url = `${baseUrl}/node`
		const response = yield* effectSuperagentGet(url)

		const firstParse = z.array(z.string()).safeParse(response.body)

		if (!firstParse.success) {
			return yield* Effect.fail(
				new ZodError({
					message: firstParse.error.message,
					issues: firstParse.error.issues,
				}),
			)
		}

		return firstParse.data.map((s) => s.replace(/\/$/, '')) as AllUnsafeVersion[]
	})

/**
 * Require that IS04 version is set
 */
export const requireIS04Version = (): Effect.Effect<void, IS04VersionNotSetError, NMOSNodeApiService> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const version = yield* Ref.get(service.verifiedIS04Version)

		if (!version) {
			return yield* Effect.fail(
				new IS04VersionNotSetError({
					message: 'IS04 version not set',
				}),
			)
		}

		return void 0 as void
	})

/**
 * Get the base URL for the NMOS node
 */
export const getBaseUrl = (): Effect.Effect<string, never, NMOSNodeApiService> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const ctx = service.options
		return `${ctx.protocol}://${ctx.host}:${ctx.port}${ctx.basePath}`
	})

/**
 * Create a GET request
 */
export const get = (url: string): Effect.Effect<superagent.Request, never, NMOSNodeApiService> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const ctx = service.options
		const timeout = ctx.timeout ?? 10000
		return superagent.get(url).timeout(timeout).disableTLSCerts().accept('json')
	})

/**
 * Get node self information
 */
export const nodeSelfGet = (): Effect.Effect<
	z.infer<typeof nodeapiSelfV13> | z.infer<typeof nodeapiSelfV12>,
	IS04VersionNotSetError | ZodError | VersionError | SuperagentError,
	NMOSNodeApiService
> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const version = yield* Ref.get(service.verifiedIS04Version)

		console.log('nodeSelfGet', version)

		if (!version) {
			return yield* Effect.fail(
				new IS04VersionNotSetError({
					message: 'IS04 version not set',
				}),
			)
		}

		const baseUrl = yield* getBaseUrl()
		const url = `${baseUrl}/node/${version}/self`
		const httpRes = yield* effectSuperagentGet(url)

		return yield* versionedValidation({
			v1_3_Schema: nodeapiSelfV13,
			v1_2_Schema: nodeapiSelfV12,
			version,
			httpRes,
		})
	})

/**
 * Get node devices
 */
export const nodeDevicesGet = (): Effect.Effect<
	z.infer<typeof nodeapiDevicesV13> | z.infer<typeof nodeapiDevicesV12>,
	IS04VersionNotSetError | ZodError | VersionError | SuperagentError,
	NMOSNodeApiService
> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const version = yield* Ref.get(service.verifiedIS04Version)

		console.log('nodeDevicesGet', version)

		if (!version) {
			return yield* Effect.fail(
				new IS04VersionNotSetError({
					message: 'IS04 version not set',
				}),
			)
		}

		const baseUrl = yield* getBaseUrl()
		const url = `${baseUrl}/node/${version}/devices`
		const httpRes = yield* effectSuperagentGet(url)

		return yield* versionedValidation({
			v1_3_Schema: nodeapiDevicesV13,
			v1_2_Schema: nodeapiDevicesV12,
			version,
			httpRes,
		})
	})

/**
 * Get node sources
 */
export const nodeSourcesGet = (): Effect.Effect<
	z.infer<typeof nodeapiSourcesV13> | z.infer<typeof nodeapiSourcesV12>,
	IS04VersionNotSetError | ZodError | VersionError | SuperagentError,
	NMOSNodeApiService
> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const version = yield* Ref.get(service.verifiedIS04Version)

		console.log('nodeSourcesGet', version)

		if (!version) {
			return yield* Effect.fail(
				new IS04VersionNotSetError({
					message: 'IS04 version not set',
				}),
			)
		}

		const baseUrl = yield* getBaseUrl()
		const url = `${baseUrl}/node/${version}/sources`
		const httpRes = yield* effectSuperagentGet(url)

		return yield* versionedValidation({
			v1_3_Schema: nodeapiSourcesV13,
			v1_2_Schema: nodeapiSourcesV12,
			version,
			httpRes,
		})
	})

/**
 * Get node flows
 */
export const nodeFlowsGet = (): Effect.Effect<
	z.infer<typeof nodeapiFlowsV13> | z.infer<typeof nodeapiFlowsV12>,
	IS04VersionNotSetError | ZodError | VersionError | SuperagentError,
	NMOSNodeApiService
> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const version = yield* Ref.get(service.verifiedIS04Version)

		console.log('nodeFlowsGet', version)

		if (!version) {
			return yield* Effect.fail(
				new IS04VersionNotSetError({
					message: 'IS04 version not set',
				}),
			)
		}

		const baseUrl = yield* getBaseUrl()
		const url = `${baseUrl}/node/${version}/flows`
		const httpRes = yield* effectSuperagentGet(url)

		return yield* versionedValidation({
			v1_3_Schema: nodeapiFlowsV13,
			v1_2_Schema: nodeapiFlowsV12,
			version,
			httpRes,
		})
	})

/**
 * Get node senders
 */
export const nodeSendersGet = (): Effect.Effect<
	z.infer<typeof nodeapiSendersV13> | z.infer<typeof nodeapiSendersV12>,
	IS04VersionNotSetError | ZodError | VersionError | SuperagentError,
	NMOSNodeApiService
> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const version = yield* Ref.get(service.verifiedIS04Version)

		console.log('nodeSendersGet', version)

		if (!version) {
			return yield* Effect.fail(
				new IS04VersionNotSetError({
					message: 'IS04 version not set',
				}),
			)
		}

		const baseUrl = yield* getBaseUrl()
		const url = `${baseUrl}/node/${version}/senders`
		const httpRes = yield* effectSuperagentGet(url)

		return yield* versionedValidation({
			v1_3_Schema: nodeapiSendersV13,
			v1_2_Schema: nodeapiSendersV12,
			version,
			httpRes,
		})
	})

/**
 * Validate response based on version
 */
export const versionedValidation = <T1 extends z.ZodSchema<unknown>, T2 extends z.ZodSchema<unknown>>(props: {
	v1_3_Schema: T1
	v1_2_Schema: T2
	version: SupportedVersion
	httpRes: superagent.Response
}): Effect.Effect<z.infer<T1> | z.infer<T2>, ZodError | VersionError> => {
	if (props.version === 'v1.3') {
		const res = props.v1_3_Schema.safeParse(props.httpRes.body)
		if (res.error) {
			return Effect.fail(
				new ZodError({
					message: res.error.message,
					issues: res.error.issues,
				}),
			)
		}

		return Effect.succeed(res.data as z.infer<T1>)
	}

	if (props.version === 'v1.2') {
		const res = props.v1_2_Schema.safeParse(props.httpRes.body)
		if (res.error) {
			return Effect.fail(
				new ZodError({
					message: res.error.message,
					issues: res.error.issues,
				}),
			)
		}

		return Effect.succeed(res.data as z.infer<T2>)
	}

	return Effect.fail(
		new VersionError({
			code: 'VERSION_UNKNOWN',
			message: 'Unknown IS04 version',
		}),
	)
}

/**
 * Get node receivers
 */
export const nodeReceiversGet = (): Effect.Effect<
	z.infer<typeof nodeapiReceiversV13> | z.infer<typeof nodeapiReceiversV12>,
	IS04VersionNotSetError | ZodError | VersionError | SuperagentError,
	NMOSNodeApiService
> =>
	Effect.gen(function* () {
		const service = yield* NMOSNodeApiService
		const version = yield* Ref.get(service.verifiedIS04Version)

		console.log('nodeReceiversGet', version)

		if (!version) {
			return yield* Effect.fail(
				new IS04VersionNotSetError({
					message: 'IS04 version not set',
				}),
			)
		}

		const baseUrl = yield* getBaseUrl()
		const url = `${baseUrl}/node/${version}/receivers`
		const httpRes = yield* effectSuperagentGet(url)

		return yield* versionedValidation({
			v1_3_Schema: nodeapiReceiversV13,
			v1_2_Schema: nodeapiReceiversV12,
			version,
			httpRes,
		})
	})
