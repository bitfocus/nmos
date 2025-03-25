import { z } from 'zod'
import { _portPrimitive } from '../../../is04/v1.3/zod/_primitives'

export default z
	.array(
		z.object({
			id: z.string()
				.describe('ID of a device to be activated'),
			code: z.number()
				.describe('HTTP status code that would have resulted from an individual activation on this device'),
			error: z
				.string()
				.describe(
					"Human readable message which is suitable for user interface display, and helpful to the user. Only included if 'code' indicates an error state"
				)
				.optional(),
			debug: z.
				string().nullable()
						.describe(
							"Debug information which may assist a programmer working with the API. Only included if 'code' indicates an error state"
						)
				
				.optional(),
		})
	)
	.describe('Describes a response to a bulk activation request')
