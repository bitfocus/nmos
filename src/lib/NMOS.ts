import { NMOSDeviceRuntimeOptions, NMOSNodeRuntimeOptions } from './types'
import { Axios } from 'axios'
import is04endpoints from '../schema/is04/index'
import is05endpoints from '../schema/is05/index'
import { z, ZodError } from 'zod'
import _ from 'lodash'

type IS04Endpoints = typeof is04endpoints
export type IS04EndpointTypes = keyof typeof is04endpoints
export type IS04EndpointType<T extends IS04EndpointTypes> = z.infer<IS04Endpoints[T]>

type IS05Endpoints = typeof is05endpoints
export type IS05EndpointTypes = keyof typeof is05endpoints
export type IS05EndpointType<T extends IS05EndpointTypes> = z.infer<IS05Endpoints[T]>

export class NMOSNodeRuntime {
	private runtime: Axios
	private options: NMOSNodeRuntimeOptions

	constructor(options: NMOSNodeRuntimeOptions) {
		this.options = options
		this.runtime = new Axios({
			baseURL: `${options.protocol}://${options.host}:${options.port}${options.basePath}`,
			timeout: 1000,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	async get<T extends IS04EndpointTypes>(path: T, options: Record<string, string> = {}): Promise<z.infer<typeof is04endpoints[T]>> {
		const endpoint = is04endpoints[path]
		const resolvedPath = path.replace(/{([^}]*)}/g, (_, key) => options[key])
		const result = await this.runtime.get<IS04EndpointType<T>>(resolvedPath)

		if (result.status !== 200) {
			throw new Error('Failed to fetch data from: ' + resolvedPath)
		}

		if (typeof result.data === 'string') {
			try {
				result.data = JSON.parse(result.data)
			} catch (error) {
				console.error(error)
				throw new Error('Failed to parse JSON')
			}
		}

		if (this.options.strict) {
			return await endpoint.parseAsync(result.data)
		} else {
			const parse = await endpoint.safeParseAsync(result.data)

			if (!parse.success) {
				parse.error.errors.forEach((error) => {
					console.error('Validation error [' + path + ']', error.path.join('.') + ': ' + error.message, 'received', _.get(result.data, error.path.join('.')))
				})
			}

			return parse.data as z.infer<typeof endpoint>
		}
	}
}

export class NMOSConnectionRuntime {
	private runtime: Axios
	private options: NMOSDeviceRuntimeOptions

	constructor(options: NMOSDeviceRuntimeOptions) {
		this.options = options
		this.runtime = new Axios({
			baseURL: `${options.baseUrl}`,
			timeout: 1000,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	async execute<T extends IS05EndpointTypes>(method: 'patch' | 'get', path: T, options: Record<string, string> = {}) {
		const endpoint = is05endpoints[path]
		const resolvedPath = path.replace(/{([^}]*)}/g, (_, key) => options[key])

		if (method !== 'get' && method !== 'patch') {
			throw new Error('unknwon method ' + method)
		}

		const result = method === 'get' ? await this.runtime.get<IS05EndpointType<T>>(resolvedPath) : method === 'patch' ? await this.runtime.patch<IS05EndpointType<T>>(resolvedPath) : undefined

		if (!result) {
			throw new Error('Unknown error')
		}

		if (result.status !== 200) {
			throw new Error('Failed to fetch data from: ' + resolvedPath)
		}

		try {
			if (typeof result.data === 'string') {
				try {
					result.data = JSON.parse(result.data)
				} catch (error) {
					console.error(error)
					throw new Error('Failed to parse JSON')
				}
			}

			const parse = await endpoint.safeParseAsync(result.data)

			if (!parse.success) {
				parse.error.errors.forEach((error) => {
					console.error('Validation error [' + path + ']', error.path.join('.') + ': ' + error.message, 'received', _.get(result.data, error.path.join('.')))
				})

				if (this.options.strict) {
					console.error('Strict mode enabled, failed to parse data')
					throw new ZodError(parse.error.issues)
				}
			}

			return parse.data as z.infer<typeof endpoint>

		} catch (error) {
			console.error('error', error)
		}
	}

	async get<T extends IS05EndpointTypes>(path: T, options: Record<string, string> = {}) {
		this.execute('get', path, options)
	}

	async patch<T extends IS05EndpointTypes>(path: T, options: Record<string, string> = {}) {
		this.execute('patch', path, options)
	}
}




export class NMOSConnectionAPI extends NMOSConnectionRuntime {
	constructor({
		baseUrl = '',
		strict = true,
	}: Partial<NMOSDeviceRuntimeOptions>) {
		super({
			baseUrl,
			strict,
		})
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
	}: Partial<NMOSNodeRuntimeOptions>) {
		super({
			dialect,
			protocol,
			host,
			port,
			basePath,
			strict,
		})
	}
}
