export type NMOSDialect = null | 'test'

export type NMOSNodeRuntimeOptions = {
	protocol: 'http' | 'https'
	host: string
	port: number
	basePath: string
	dialect: NMOSDialect
	strict: boolean
}

export type NMOSDeviceRuntimeOptions = {
	baseUrl: string
	strict: boolean
}