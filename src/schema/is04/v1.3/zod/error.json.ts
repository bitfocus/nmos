import { z } from 'zod'

export default z
	.object({
		code: z.number().int().gte(400).lte(599).describe('HTTP error code'),
		error: z
			.string()
			.describe('Human readable message which is suitable for user interface display, and helpful to the user'),
		debug: z
			.union([
				z.null().describe('Debug information which may assist a programmer working with the API'),
				z.string().describe('Debug information which may assist a programmer working with the API'),
			])
			.describe('Debug information which may assist a programmer working with the API'),
	})
	.describe('Describes the standard error response which is returned with HTTP codes 400 and above')
