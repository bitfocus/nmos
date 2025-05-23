import { z } from 'zod'
import { idPrimitive, versionPrimitive } from './_primitives'
import { _audioChannels } from "./_propAudioChannels"

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
								id: idPrimitive
									.describe('Globally unique identifier for the resource'),
								version: versionPrimitive
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
									'Maximum number of Grains per second for Flows derived from this Source. Corresponding Flow Grain rates may override this attribute. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Sources only.'
								)
								.optional(),
							caps: z.record(z.any()).describe('Capabilities (not yet defined)'),
							device_id: idPrimitive
								.describe(
									'Globally unique identifier for the Device which initially created the Source. This attribute is used to ensure referential integrity by registry implementations.'
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
									'Array of UUIDs representing the Source IDs of Grains which came together at the input to this Source (may change over the lifetime of this Source)'
								),
							clock_name: z
								.union([
									z
										.string()
										.regex(new RegExp('^clk[0-9]+$'))
										.describe('Reference to clock in the originating Node'),
									z.null().describe('Reference to clock in the originating Node'),
								])
								.describe('Reference to clock in the originating Node'),
						})
					)
				)
				.describe('Describes a Source'),
			z.object({
				format: z
					.literal('urn:x-nmos:format:audio')
					.describe('Format of the data coming from the Source as a URN'),
				channels: z
					.array(
						z.object({
							label: z.string().describe('Label for this channel'),
							symbol: 
								_audioChannels
								.describe('Symbol for this channel (from VSF TR-03 Appendix A)')
								,
						})
					)
					.min(1)
					.describe('Array of objects describing the audio channels'),
			})
		)
	)
	.describe('Describes an audio Source')
