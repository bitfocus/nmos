import { z } from 'zod'

export default z
	.object({
		max_update_rate_ms: z
			.number()
			.int()
			.describe('Rate limiting for messages. Sets the minimum interval between consecutive websocket messages')
			.default(100),
		persist: z.boolean().describe('Whether to destroy the socket when the final client disconnects').default(false),
		resource_path: z
			.enum(['/nodes', '/devices', '/sources', '/flows', '/senders', '/receivers'])
			.describe('HTTP resource path in the query API which this subscription relates to'),
		params: z
			.record(z.any())
			.describe(
				'Object containing attributes to filter the resource on as per the Query Parameters specification. Can be empty.'
			),
	})
	.describe('Register a new resource or update an existing resource')
