import { z } from 'zod'

export default z
	.object({
		max_update_rate_ms: z
			.number()
			.int()
			.describe(
				'Rate limiting for messages. Sets the minimum interval (in milliseconds) between consecutive WebSocket messages.',
			)
			.default(100),
		persist: z
			.boolean()
			.describe('Whether the API will retain or destroy the subscription after the final client disconnects')
			.default(false),
		secure: z
			.boolean()
			.describe(
				"Whether a secure WebSocket connection (wss://) is required. NB: Default should be 'true' if the API is being presented via HTTPS, and 'false' otherwise.",
			)
			.optional(),
		resource_path: z
			.enum(['/nodes', '/devices', '/sources', '/flows', '/senders', '/receivers'])
			.describe('HTTP resource path in the Query API to which this subscription relates'),
		params: z
			.record(z.any())
			.describe(
				'Object containing attributes to filter the resource on as per the Query Parameters specification. Can be empty.',
			),
		authorization: z
			.boolean()
			.describe(
				"Whether the WebSocket connection requires authorization. NB: Default should be 'true' if the API requires authorization, and 'false' otherwise.",
			)
			.optional(),
	})
	.describe('Create a new subscription to a Query API')
