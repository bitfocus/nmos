import { NMOSDeviceRuntimeOptions, NMOSNodeRuntimeOptions } from './types'
import is04endpoints from '../schema/is04/index'
import is05endpoints from '../schema/is05/index'
import { z, ZodError, type ZodIssue } from 'zod'
import _, { type get } from 'lodash'
import superagent, { type SuperAgent, type SuperAgentStatic } from 'superagent'
import nodeapiBaseV13 from '../schema/is04/v1.3/zod/nodeapi-base.json'
import nodeapiBaseV12 from '../schema/is04/v1.2/zod/nodeapi-base.json'
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
import { safeSuperagent, type SUPERAGENT_ERROR } from './neverthrow_superagent'
import type { ZOD_WRAPPED_ERROR } from './neverthrow_zod'
import type { NeverthrowResult } from './neverthrow'

type IS04Endpoints = typeof is04endpoints
export type IS04EndpointTypes = keyof typeof is04endpoints
export type IS04EndpointType<T extends IS04EndpointTypes> = z.infer<IS04Endpoints[T]>

type IS05Endpoints = typeof is05endpoints
export type IS05EndpointTypes = keyof typeof is05endpoints
export type IS05EndpointType<T extends IS05EndpointTypes> = z.infer<IS05Endpoints[T]>


export class NMOSNodeRuntime {
	private options: NMOSNodeRuntimeOptions

	private protocol: 'http' | 'https'
	private host: string
	private port: number
	private basePath: string
	private is04Version: 'v1.0' | 'v1.1' | 'v1.2' | 'v1.3' | undefined
	private timeout: number = 2000
	private insecureHTTPParser: boolean = true

	constructor(options: NMOSNodeRuntimeOptions) {
		this.options = options
		this.protocol = options.protocol
		this.host = options.host
		this.port = options.port
		this.basePath = options.basePath
		this.timeout = options.timeout || 2000
		this.insecureHTTPParser = options.insecureHTTPParser || true
	}

	setIS04Version(version: 'v1.0' | 'v1.1' | 'v1.2' | 'v1.3') {
		this.is04Version = version
	}

	async probeNodeApiSupport(): Promise<NeverthrowResult<('v1.0' | 'v1.1' | 'v1.2' | 'v1.3')[]>> {
		const response = await safeSuperagent(() => this.get(`${this.getBaseUrl()}/node`))
		
		if (response.error) {
			return { ok: null, error: response.error }
		}

		const firstParse = z
			.array(z.string())
			.safeParse(response.ok.body)

		if (!firstParse.success) {
			return { ok: null, error: { code: 'ZOD_ERROR', message: firstParse.error.message, issues: firstParse.error.issues } }
		}

		return { ok: firstParse.data.map((s) => s.replace(/\/$/, '')) as ('v1.0' | 'v1.1' | 'v1.2' | 'v1.3')[], error: null }
	}

	requireIS04Version() {
		if (!this.is04Version) {
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
		console.log('nodeSelfGet', this.is04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() => this.get(`${this.getBaseUrl()}/node/${this.is04Version}/self`))
		
		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.is04Version === 'v1.3') {
			const safe = nodeapiSelfV13.safeParse(httpRes.ok.body)
			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiSelfV12.safeParse(httpRes.ok.body)
			// do polyfill here....
			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeDevicesGet(): Promise<NeverthrowResult<z.infer<typeof nodeapiDevicesV13> | z.infer<typeof nodeapiDevicesV12>>> {
		console.log('nodeDevicesGet', this.is04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() => this.get(`${this.getBaseUrl()}/node/${this.is04Version}/devices`))
		
		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.is04Version === 'v1.3') {
			const safe = nodeapiDevicesV13.safeParse(httpRes.ok.body)
			
			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiDevicesV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}


	async nodeSourcesGet(): Promise<NeverthrowResult<z.infer<typeof nodeapiSourcesV13> | z.infer<typeof nodeapiSourcesV12>>> {
		console.log('nodeSourcesGet', this.is04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() => this.get(`${this.getBaseUrl()}/node/${this.is04Version}/sources`))
		
		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.is04Version === 'v1.3') {
			const safe = nodeapiSourcesV13.safeParse(httpRes.ok.body)

			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiSourcesV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}


	async nodeFlowsGet(): Promise<NeverthrowResult<z.infer<typeof nodeapiFlowsV13> | z.infer<typeof nodeapiFlowsV12>>> {
		console.log('nodeFlowsGet', this.is04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() => this.get(`${this.getBaseUrl()}/node/${this.is04Version}/flows`))
		
		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.is04Version === 'v1.3') {
			const safe = nodeapiFlowsV13.safeParse(httpRes.ok.body)

			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiFlowsV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeSendersGet(): Promise<NeverthrowResult<z.infer<typeof nodeapiSendersV13> | z.infer<typeof nodeapiSendersV12>>> {
		console.log('nodeSendersGet', this.is04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() => this.get(`${this.getBaseUrl()}/node/${this.is04Version}/senders`))

		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.is04Version === 'v1.3') {
			const safe = nodeapiSendersV13.safeParse(httpRes.ok.body)

			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiSendersV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeReceiversGet(): Promise<NeverthrowResult<z.infer<typeof nodeapiReceiversV13> | z.infer<typeof nodeapiReceiversV12>>> {
		console.log('nodeReceiversGet', this.is04Version)
		this.requireIS04Version()
		const httpRes = await safeSuperagent(() => this.get(`${this.getBaseUrl()}/node/${this.is04Version}/receivers`))

		if (httpRes.error) {
			return { ok: null, error: httpRes.error }
		}

		if (this.is04Version === 'v1.3') {
			const safe = nodeapiReceiversV13.safeParse(httpRes.ok.body)

			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiReceiversV12.safeParse(httpRes.ok.body)

			if (safe.error) {
				return { ok: null, error: { code: 'ZOD_ERROR', message: safe.error.message, issues: safe.error.issues } }
			}

			return { ok: safe.data, error: null }
		}

		throw new Error('Unknown IS04 version')
	}

	
}



export class NMOSNodeAPI extends NMOSNodeRuntime {
	constructor({
		dialect = null,
		protocol = 'http',
		host = '127.0.0.1',
		port = 80,
		basePath = '/x-nmos',
		strict = true,
		insecureHTTPParser = true,
		timeout = 2000,
	}: Partial<NMOSNodeRuntimeOptions>) {
		super({
			dialect,
			protocol,
			host,
			port,
			basePath,
			strict,
			insecureHTTPParser,
			timeout,
		})
	}
}


