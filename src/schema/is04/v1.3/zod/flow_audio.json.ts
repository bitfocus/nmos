import { z } from 'zod'

export default z
	.record(z.any())
	.and(
		z.intersection(
			z
				.record(z.any())
				.and(
					z.intersection(
						z
							.object({
								id: z
									.string()
									.regex(
										new RegExp(
											'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
										)
									)
									.describe('Globally unique identifier for the resource'),
								version: z
									.string()
									.regex(new RegExp('^[0-9]+:[0-9]+$'))
									.describe(
										'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
									),
								label: z.string().describe('Freeform string label for the resource'),
								description: z.string().describe('Detailed description of the resource'),
								tags: z
									.record(z.array(z.string()))
									.superRefine((value, ctx) => {
										for (const key in value) {
											if (key.match(new RegExp(''))) {
												const result = z.array(z.string()).safeParse(value[key])
												if (!result.success) {
													ctx.addIssue({
														path: [...ctx.path, key],
														code: 'custom',
														message: `Invalid input: Key matching regex /${key}/ must match schema`,
														params: {
															issues: result.error.issues,
														},
													})
												}
											}
										}
									})
									.describe(
										'Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'
									),
							})
							.describe('Describes the foundations of all NMOS resources'),
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
							source_id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe(
									'Globally unique identifier for the Source which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.0 only).'
								),
							device_id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe(
									'Globally unique identifier for the Device which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.1 onwards).'
								),
							parents: z
								.array(
									z
										.string()
										.regex(
											new RegExp(
												'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
											)
										)
								)
								.describe(
									'Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'
								),
						})
					)
				)
				.describe('Describes a Flow'),
			z.object({
				format: z
					.literal('urn:x-nmos:format:audio')
					.describe('Format of the data coming from the Flow as a URN'),
				sample_rate: z
					.object({
						numerator: z.number().int().describe('Numerator'),
						denominator: z.number().int().describe('Denominator').default(1),
					})
					.describe('Number of audio samples per second for this Flow'),
			})
		)
	)
	.describe('Describes an audio Flow')
