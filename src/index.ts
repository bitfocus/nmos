import { NMOS } from './NMOS'

const nmos = new NMOS({
	protocol: 'http',
	host: '10.0.0.3',
	port: 8090,
	basePath: '/x-nmos',
	dialect: 'test',
})

const node = await nmos.get('/node/v1.3/self')
