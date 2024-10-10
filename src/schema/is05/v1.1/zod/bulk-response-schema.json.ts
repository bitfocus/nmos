import { z } from 'zod'

export default z
	.array(
		z.object({
			id: z
				.string()
				.regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
				.describe('ID of a device to be activated'),
			code: z
				.union([z.any(), z.any()])
				.describe('HTTP status code that would have resulted from an individual activation on this device'),
			error: z
				.string()
				.describe(
					"Human readable message which is suitable for user interface display, and helpful to the user. Only included if 'code' indicates an error state"
				)
				.optional(),
			debug: z
				.union([
					z
						.null()
						.describe(
							"Debug information which may assist a programmer working with the API. Only included if 'code' indicates an error state"
						),
					z
						.string()
						.describe(
							"Debug information which may assist a programmer working with the API. Only included if 'code' indicates an error state"
						),
				])
				.describe(
					"Debug information which may assist a programmer working with the API. Only included if 'code' indicates an error state"
				)
				.optional(),
		})
	)
	.describe('Describes a response to a bulk activation request')
