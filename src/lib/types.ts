import type { SupportedVersion } from './NMOS'

export type NMOSDialect = null | 'test'

export type NMOSNodeLinkOptions = {
	protocol: 'http' | 'https'
	host: string
	port: number
	basePath: string
	strict: boolean
	insecureHTTPParser: boolean
	timeout?: number
	is04Version?: SupportedVersion | 'auto'
}

export type NMOSDeviceRuntimeOptions = {
	baseUrl: string
	strict: boolean
}
