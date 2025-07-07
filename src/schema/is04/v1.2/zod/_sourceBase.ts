import { z } from 'zod'
import { idPrimitive } from './_primitives'

export const _sourceBase = z.object({
	grain_rate: z
		.object({
			numerator: z.number().int().describe('Numerator'),
			denominator: z.number().int().describe('Denominator').default(1),
		})
		.describe(
			'Maximum number of Grains per second for Flows derived from this Source. Corresponding Flow Grain rates may override this attribute. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Sources only.',
		)
		.optional(),
	caps: z.record(z.any()).describe('Capabilities (not yet defined)'),
	device_id: idPrimitive.describe(
		'Globally unique identifier for the Device which initially created the Source. This attribute is used to ensure referential integrity by registry implementations.',
	),
	parents: z
		.array(idPrimitive)
		.describe(
			'Array of UUIDs representing the Source IDs of Grains which came together at the input to this Source (may change over the lifetime of this Source)',
		),
	clock_name: z
		.union([
			z.string().regex(new RegExp('^clk[0-9]+$')).describe('Reference to clock in the originating Node'),
			z.null().describe('Reference to clock in the originating Node'),
		])
		.describe('Reference to clock in the originating Node'),
})
