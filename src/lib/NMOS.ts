import { NMOSDeviceRuntimeOptions, NMOSNodeRuntimeOptions } from './types'
import is04endpoints from '../schema/is04/index'
import is05endpoints from '../schema/is05/index'
import { z, ZodError } from 'zod'
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

	async probeNodeApiSupport(): Promise<('v1.0' | 'v1.1' | 'v1.2' | 'v1.3')[]> {
		const response = await this.get(`${this.protocol}://${this.host}:${this.port}${this.basePath}/node`)
		const firstParse = z
			.array(z.string())
			.parse(response.body)
			.map((s) => s.replace(/\/$/, ''))
	
		return firstParse as ('v1.0' | 'v1.1' | 'v1.2' | 'v1.3')[]
	}

	requireIS04Version() {
		if (!this.is04Version) {
			throw new Error('IS04 version not set')
		}
	}

	get(url: string) {
		return superagent.get(url).timeout(this.timeout).disableTLSCerts().accept('json')
	}

	async nodeSelfGet() {
		this.requireIS04Version()
		const httpRes = await this.get(`${this.protocol}://${this.host}:${this.port}${this.basePath}/node/${this.is04Version}/self`)
		
		if (this.is04Version === 'v1.3') {
			const safe = nodeapiSelfV13.parse(httpRes.body)
			return safe
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiSelfV12.parse(httpRes.body)
			// do polyfill here....
			return safe
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeDevicesGet() {
		this.requireIS04Version()
		const httpRes = await this.get(`${this.protocol}://${this.host}:${this.port}${this.basePath}/node/${this.is04Version}/devices`)
		
		if (this.is04Version === 'v1.3') {
			const safe = nodeapiDevicesV13.parse(httpRes.body)
			return safe
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiDevicesV12.parse(httpRes.body)
			return safe
		}

		throw new Error('Unknown IS04 version')
	}


	async nodeSourcesGet() {
		this.requireIS04Version()
		const httpRes = await this.get(`${this.protocol}://${this.host}:${this.port}${this.basePath}/node/${this.is04Version}/sources`)
		
		if (this.is04Version === 'v1.3') {
			const safe = nodeapiSourcesV13.parse(httpRes.body)
			return safe
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiSourcesV12.parse(httpRes.body)
			return safe
		}

		throw new Error('Unknown IS04 version')
	}


	async nodeFlowsGet() {
		this.requireIS04Version()
		const httpRes = await this.get(`${this.protocol}://${this.host}:${this.port}${this.basePath}/node/${this.is04Version}/flows`)
		
		if (this.is04Version === 'v1.3') {
			const safe = nodeapiFlowsV13.parse(httpRes.body)
			return safe
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiFlowsV12.parse(httpRes.body)
			return safe
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeSendersGet() {
		this.requireIS04Version()
		const httpRes = await this.get(`${this.protocol}://${this.host}:${this.port}${this.basePath}/node/${this.is04Version}/senders`)
		
		if (this.is04Version === 'v1.3') {
			const safe = nodeapiSendersV13.parse(httpRes.body)
			return safe
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiSendersV12.parse(httpRes.body)
			return safe
		}

		throw new Error('Unknown IS04 version')
	}

	async nodeReceiversGet() {
		this.requireIS04Version()
		const httpRes = await this.get(`${this.protocol}://${this.host}:${this.port}${this.basePath}/node/${this.is04Version}/receivers`)

		if (this.is04Version === 'v1.3') {
			const safe = nodeapiReceiversV13.parse(httpRes.body)
			return safe
		}

		if (this.is04Version === 'v1.2') {
			const safe = nodeapiReceiversV12.parse(httpRes.body)
			return safe
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
