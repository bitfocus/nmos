import { z } from 'zod'

export default z
	.array(
		z
			.object({
				id: idPrimitive
					.describe('Globally unique identifier for the subscription'),
				ws_href: z.string().url().describe('Address to connect to for the websocket subscription'),
				max_update_rate_ms: z
					.number()
					.int()
					.describe(
						'Rate limiting for messages. Sets the minimum interval (in milliseconds) between consecutive WebSocket messages.'
					)
					.default(100),
				persist: z
					.boolean()
					.describe(
						'Whether the API will retain or destroy the subscription after the final client disconnects'
					)
					.default(false),
				secure: z.boolean().describe('Whether a secure WebSocket connection (wss://) is required.'),
				resource_path: z
					.enum(['/nodes', '/devices', '/sources', '/flows', '/senders', '/receivers'])
					.describe('HTTP resource path in the Query API to which this subscription relates'),
				params: z
					.record(z.any())
					.describe(
						'Object containing attributes to filter the resource on as per the Query Parameters specification. Can be empty.'
					),
			})
			.describe('A single subscription to a Query API')
	)
	.min(0)
	.describe('A list of subscription resources')
