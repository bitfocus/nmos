import { z } from 'zod'
import { _nmosResourceBase } from '../../v1.3/zod/_nnosResourceBase'
import { idPrimitive } from '../../v1.3/zod/_primitives'

export default z
	.record(z.any())
	.and(
		z.intersection(
			_nmosResourceBase,
			z.object({
				grain_rate: z
					.object({
						numerator: z.number().int().describe('Numerator'),
						denominator: z.number().int().describe('Denominator').default(1),
					})
					.describe(
						'Number of Grains per second for this Flow. Must be an integer division of, or equal to the Grain rate specified by the parent Source. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Flows only.'
					)
					.optional(),
				source_id: idPrimitive
					.describe(
						'Globally unique identifier for the Source which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.0 only).'
					),
				device_id: idPrimitive
					.describe(
						'Globally unique identifier for the Device which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.1 onwards).'
					),
				parents: z
					.array(
						z
							.string()
							.regex(
								new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
							)
					)
					.describe(
						'Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'
					),
			})
		)
	)
	.describe('Describes a Flow')
