import NMOS from '../src/index'

const nmos = new NMOS({
	protocol: 'http',
	host: '10.0.0.3',
	port: 8090,
	basePath: '/x-nmos',
	dialect: 'test',
	strict: true,
})

async function main() {
	const sources = await nmos.get('/node/v1.3/sources');
	console.log("sources",sources);
}

main();
