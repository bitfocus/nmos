export type NMOSDialect = null | 'test'

export type NMOSNodeLinkOptions = {
	protocol: 'http' | 'https'
	host: string
	port: number
	basePath: string
	dialect: NMOSDialect
	strict: boolean
	insecureHTTPParser: boolean
	timeout?: number
	is04Version?: 'v1.2' | 'v1.3' | 'auto' | string
}

export type NMOSDeviceRuntimeOptions = {
	baseUrl: string
	strict: boolean
}
