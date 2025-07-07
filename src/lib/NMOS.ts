import { z } from 'zod'
import superagent from 'superagent'
import nodeapiSelfV13 from '../schema/is04/v1.3/zod/_node'
import nodeapiSelfV12 from '../schema/is04/v1.2/zod/_node'
import nodeapiDevicesV13 from '../schema/is04/v1.3/zod/_devices'
import nodeapiDevicesV12 from '../schema/is04/v1.2/zod/_devices'
import nodeapiSourcesV13 from '../schema/is04/v1.3/zod/_sources'
import nodeapiSourcesV12 from '../schema/is04/v1.2/zod/_sources'
import nodeapiFlowsV13 from '../schema/is04/v1.3/zod/_flows'
import nodeapiFlowsV12 from '../schema/is04/v1.2/zod/_flows'
import nodeapiSendersV13 from '../schema/is04/v1.3/zod/_senders'
import nodeapiSendersV12 from '../schema/is04/v1.2/zod/_senders'
import nodeapiReceiversV13 from '../schema/is04/v1.3/zod/_receivers'
import nodeapiReceiversV12 from '../schema/is04/v1.2/zod/_receivers'
import { safeSuperagent } from './neverthrow_superagent'
import type { NeverthrowError, NeverthrowResult } from './neverthrow'
import type { NMOSNodeLinkOptions } from './types'
import { getHighestMatchingVersion } from './getHighestMatchingVersion'

/*
type IS04Endpoints = typeof is04endpoints
export type IS04EndpointTypes = keyof typeof is04endpoints
export type IS04EndpointType<T extends IS04EndpointTypes> = z.infer<IS04Endpoints[T]>

type IS05Endpoints = typeof is05endpoints
export type IS05EndpointTypes = keyof typeof is05endpoints
export type IS05EndpointType<T extends IS05EndpointTypes> = z.infer<IS05Endpoints[T]>
*/

export type NmosResult<T> =
	| {
			ok: T
			error: null
	  }
	| {
			ok: null
			error: NeverthrowError
	  }

export type SupportedVersion = 'v1.2' | 'v1.3'
export type AllUnsafeVersion = 'v1.0' | 'v1.1' | 'v1.2' | 'v1.3'
export class NMOSNodeApi {
	static IS04_VERSIONS_ALL: AllUnsafeVersion[] = ['v1.0', 'v1.1', 'v1.2', 'v1.3']
	static IS04_VERSIONS_SUPPORTED: SupportedVersion[] = ['v1.2', 'v1.3']
	static SupportedVersionsSchema = z.enum(['v1.2', 'v1.3'])

	private protocol: 'http' | 'https'
	private host: string
	private port: number
	private basePath: string
	private requestedIS04Version: SupportedVersion | 'auto' | undefined
	private verifiedIS04Version: SupportedVersion | undefined
	private timeout = 2000
	private insecureHTTPParser: boolean

	constructor(options: NMOSNodeLinkOptions) {
		this.protocol = options.protocol
		this.host = options.host
		this.port = options.port
		this.requestedIS04Version = options.is04Version
		this.basePath = options.basePath
		this.timeout = options.timeout || 2000
		this.insecureHTTPParser = options.insecureHTTPParser || true
	}

	public getVerifiedIS04Version(): SupportedVersion {
		if (!this.verifiedIS04Version) {
			throw new Error('IS04 version not set')
		}

		return this.verifiedIS04Version
	}

	setIS04Version(version: SupportedVersion) {
		this.verifiedIS04Version = version
	}

	async probeAndUseApiVersion() {
		const version = this.requestedIS04Version
		// if the version is auto, we need to:
		// 1. probe the node for supported versions
		// 2. use the highest version we support
		// 3. set the version
		if (!version || version === 'auto') {
			// check if the version is supported
			const probe = await this.probeNodeApiSupport()
			if (probe.error) {
				return probe
			}

			const highestVersion = getHighestMatchingVersion(NMOSNodeApi.IS04_VERSIONS_SUPPORTED, probe.ok)
			if (!highestVersion) {
				return {
					ok: null,
					error: {
						code: 'VERSION_NO_MATCH' as const,
						message: `No matching version found. Nodes versions: '${probe.ok.join(', ')}'. Supported versions: '${NMOSNodeApi.IS04_VERSIONS_SUPPORTED.join(',')}'`,
					},
				}
			}

			this.setIS04Version(highestVersion)

			return {
				ok: highestVersion,
				error: null,
			}
		}

		// if a specific version is provided, we need to:
		// 1. check if it is supported
		// 2. set the version
		// 3. if that fails, return a helpfull error message with request version and supported versions
		const probe = await this.probeNodeApiSupport()
		if (probe.error) {
			return probe
		}

		const requestVersionIsSupportedByButtons = NMOSNodeApi.SupportedVersionsSchema.safeParse(version).success
		if (!requestVersionIsSupportedByButtons) {
			return {
				ok: null,
				error: {
					code: 'VERSION_NOT_SUPPORTED_BY_BUTTONS' as const,
					message: `Reqeust API-version ${version} is not recognized`,
				},
			}
		}

		const requestedVersionIsSupportedByNode = getHighestMatchingVersion(probe.ok, [version])
		if (!requestedVersionIsSupportedByNode) {
			return {
				ok: null,
				error: {
					code: 'VERSION_NOT_SUPPORTED_BY_NODE' as const,
					message: `Requested API-version ${version} is not supported by the node. The node only supports: ${probe.ok.join(', ')}`,
				},
			}
		}

		this.setIS04Version(version as SupportedVersion)

		return {
			ok: version,
			error: null,
		}
	}

	async probeNodeApiSupport(): Promise<NmosResult<AllUnsafeVersion[]>> {
		const response = await safeSuperagent(() => this.get(`${this.getBaseUrl()}/node`))

		if (response.error) {
			return { ok: null, error: response.error }
		}

		const firstParse = z.array(z.string()).safeParse(response.ok.body)

		if (!firstParse.success) {
			return {
				ok: null,
				error: { code: 'ZOD_ERROR', message: firstParse.error.message, issues: firstParse.error.issues },
			}
		}

		return {
			ok: firstParse.data.map((s) => s.replace(/\/$/, '')) as AllUnsafeVersion[],
			error: null,
		}
	}

	requireIS04Version() {
		if (!this.verifiedIS04Version) {
			throw new Error('IS04 version not set')
		}
	}

	getBaseUrl() {
		return `${this.protocol}://${this.host}:${this.port}${this.basePath}`
	}

	get(url: string) {
		return superagent.get(url).timeout(this.timeout).disableTLSCerts().accept('json')
	}

	async nodeSelfGet(): Promise<NeverthrowResult<z.infer<typeof nodeapiSelfV13> | z.infer<typeof nodeapiSelfV12>>> {
		console.log('nodeSelfGet', this.verifiedIS04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() =>
			this.get(`${this.getBaseUrl()}/node/${this.verifiedIS04Version}/self`),
		)

		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.verifiedIS04Version === 'v1.3') {
			const safe = nodeapiSelfV13.safeParse(httpRes.ok.body)
			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		if (this.verifiedIS04Version === 'v1.2') {
			const safe = nodeapiSelfV12.safeParse(httpRes.ok.body)
			// do polyfill here....
			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeDevicesGet(): Promise<
		NeverthrowResult<
			z.infer<typeof nodeapiDevicesV13> | z.infer<typeof nodeapiDevicesV12>,
			{
				error: {
					code: 'VERSION_UNKNOWN'
					message: string
				}
				ok: null
			}
		>
	> {
		console.log('nodeDevicesGet', this.verifiedIS04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() =>
			this.get(`${this.getBaseUrl()}/node/${this.verifiedIS04Version}/devices`),
		)

		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.verifiedIS04Version === 'v1.3') {
			const safe = nodeapiDevicesV13.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		if (this.verifiedIS04Version === 'v1.2') {
			const safe = nodeapiDevicesV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		return {
			ok: null,
			error: {
				code: 'VERSION_UNKNOWN' as const,
				message: 'Unknown IS04 version in nmosDevicesGet request',
			},
		}
	}

	async nodeSourcesGet(): Promise<
		NeverthrowResult<z.infer<typeof nodeapiSourcesV13> | z.infer<typeof nodeapiSourcesV12>>
	> {
		console.log('nodeSourcesGet', this.verifiedIS04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() =>
			this.get(`${this.getBaseUrl()}/node/${this.verifiedIS04Version}/sources`),
		)

		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.verifiedIS04Version === 'v1.3') {
			const safe = nodeapiSourcesV13.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		if (this.verifiedIS04Version === 'v1.2') {
			const safe = nodeapiSourcesV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeFlowsGet(): Promise<NeverthrowResult<z.infer<typeof nodeapiFlowsV13> | z.infer<typeof nodeapiFlowsV12>>> {
		console.log('nodeFlowsGet', this.verifiedIS04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() =>
			this.get(`${this.getBaseUrl()}/node/${this.verifiedIS04Version}/flows`),
		)

		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.verifiedIS04Version === 'v1.3') {
			const safe = nodeapiFlowsV13.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		if (this.verifiedIS04Version === 'v1.2') {
			const safe = nodeapiFlowsV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeSendersGet(): Promise<
		NeverthrowResult<z.infer<typeof nodeapiSendersV13> | z.infer<typeof nodeapiSendersV12>>
	> {
		console.log('nodeSendersGet', this.verifiedIS04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() =>
			this.get(`${this.getBaseUrl()}/node/${this.verifiedIS04Version}/senders`),
		)

		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.verifiedIS04Version === 'v1.3') {
			const safe = nodeapiSendersV13.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		if (this.verifiedIS04Version === 'v1.2') {
			const safe = nodeapiSendersV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeReceiversGet(): Promise<
		NeverthrowResult<z.infer<typeof nodeapiReceiversV13> | z.infer<typeof nodeapiReceiversV12>>
	> {
		console.log('nodeReceiversGet', this.verifiedIS04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() =>
			this.get(`${this.getBaseUrl()}/node/${this.verifiedIS04Version}/receivers`),
		)

		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.verifiedIS04Version === 'v1.3') {
			const safe = nodeapiReceiversV13.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		if (this.verifiedIS04Version === 'v1.2') {
			const safe = nodeapiReceiversV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return {
					ok: null,
					error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues },
				}
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}
}
