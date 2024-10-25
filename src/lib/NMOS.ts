import { NMOSRuntimeOptions } from './types'
import { Axios } from 'axios'
import { endpoints } from '../schema'
import { z } from 'zod'

type Endpoints = typeof endpoints
export type EndpointTypes = keyof typeof endpoints
export type EndpointType<T extends EndpointTypes> = z.infer<Endpoints[T]>

export class NMOSRuntime {
	private runtime: Axios
	private options: NMOSRuntimeOptions

	constructor(options: NMOSRuntimeOptions) {
		this.options = options
		this.runtime = new Axios({
			baseURL: `${options.protocol}://${options.host}:${options.port}${options.basePath}`,
			timeout: 1000,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	async get<T extends EndpointTypes>(path: T, options: Record<string, string> = {}) {
		const endpoint = endpoints[path]
		const resolvedPath = path.replace(/{([^}]*)}/g, (_, key) => options[key])
		const result = await this.runtime.get<EndpointType<T>>(resolvedPath)

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
			try {
				const parse = await endpoint.parseAsync(result.data)
				return result.data
			} catch (error) {
				console.error('Schema validation failed', error)
				if (this.options.strict) {
					throw new Error('Strict mode enabled, failed to parse data')
				}
			}
			return result.data
		} catch (error) {
			console.error('error', error)
		}
	}
}

export class NMOS extends NMOSRuntime {
	constructor({
		dialect = null,
		protocol = 'http',
		host = '127.0.0.1',
		port = 80,
		basePath = '/x-nmos',
		strict = true,
	}: Partial<NMOSRuntimeOptions>) {
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
