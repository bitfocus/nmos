import { z } from 'zod'

export default z
	.array(
		z
			.object({
				id: z
					.string()
					.regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
					.describe('Globally unique identifier for the subscription'),
				ws_href: z.string().url().describe('Address to connect to for the websocket subscription'),
				max_update_rate_ms: z
					.number()
					.int()
					.describe(
						'Rate limiting for messages. Sets the minimum interval between consecutive websocket messages'
					)
					.default(100),
				persist: z
					.boolean()
					.describe('Whether to destroy the socket when the final client disconnects')
					.default(false),
				resource_path: z
					.enum(['/nodes', '/devices', '/sources', '/flows', '/senders', '/receivers'])
					.describe('HTTP resource path in the query API which this subscription relates to'),
				params: z
					.record(z.any())
					.describe(
						'Object containing attributes to filter the resource on as per the Query Parameters specification. Can be empty.'
					),
			})
			.describe('A single subscription resource registered with a Query API')
	)
	.min(0)
	.describe('A list of subscription resources')
