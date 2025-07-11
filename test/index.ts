import NMOSNode from '../src/index'

const nmos = new NMOSNode({
	protocol: 'http',
	host: '10.0.0.3',
	port: 8090,
	basePath: '/x-nmos',
	strict: true,
	insecureHTTPParser: true,
})

async function main() {
	const sources = await nmos.get('/node/v1.3/sources')
	console.log('sources', sources)
}

main()
