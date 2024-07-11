import { z } from 'zod'

export default z
	.array(
		z
			.record(z.any())
			.and(
				z.any().superRefine((x, ctx) => {
					const schemas = [
						z
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
														label: z
															.string()
															.describe('Freeform string label for the resource'),
														description: z
															.string()
															.describe('Detailed description of the resource'),
														tags: z
															.record(z.array(z.string()))
															.superRefine((value, ctx) => {
																for (const key in value) {
																	if (key.match(new RegExp(''))) {
																		const result = z
																			.array(z.string())
																			.safeParse(value[key])
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
															denominator: z
																.number()
																.int()
																.describe('Denominator')
																.default(1),
														})
														.describe(
															'Maximum number of Grains per second for Flows derived from this Source. Corresponding Flow Grain rates may override this attribute. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Sources only.'
														)
														.optional(),
													caps: z.record(z.any()).describe('Capabilities (not yet defined)'),
													device_id: z
														.string()
														.regex(
															new RegExp(
																'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
															)
														)
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
															z
																.null()
																.describe('Reference to clock in the originating Node'),
														])
														.describe('Reference to clock in the originating Node'),
												})
											)
										)
										.describe('Describes a Source'),
									z.object({
										format: z
											.enum([
												'urn:x-nmos:format:video',
												'urn:x-nmos:format:data',
												'urn:x-nmos:format:mux',
											])
											.describe('Format of the data coming from the Source as a URN'),
									})
								)
							)
							.describe('Describes a generic Source'),
						z
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
														label: z
															.string()
															.describe('Freeform string label for the resource'),
														description: z
															.string()
															.describe('Detailed description of the resource'),
														tags: z
															.record(z.array(z.string()))
															.superRefine((value, ctx) => {
																for (const key in value) {
																	if (key.match(new RegExp(''))) {
																		const result = z
																			.array(z.string())
																			.safeParse(value[key])
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
															denominator: z
																.number()
																.int()
																.describe('Denominator')
																.default(1),
														})
														.describe(
															'Maximum number of Grains per second for Flows derived from this Source. Corresponding Flow Grain rates may override this attribute. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Sources only.'
														)
														.optional(),
													caps: z.record(z.any()).describe('Capabilities (not yet defined)'),
													device_id: z
														.string()
														.regex(
															new RegExp(
																'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
															)
														)
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
															z
																.null()
																.describe('Reference to clock in the originating Node'),
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
													label: z.string().describe('Label for this channel (free text)'),
													symbol: z
														.any()
														.superRefine((x, ctx) => {
															const schemas = [
																z.enum([
																	'L',
																	'R',
																	'C',
																	'LFE',
																	'Ls',
																	'Rs',
																	'Lss',
																	'Rss',
																	'Lrs',
																	'Rrs',
																	'Lc',
																	'Rc',
																	'Cs',
																	'HI',
																	'VIN',
																	'M1',
																	'M2',
																	'Lt',
																	'Rt',
																	'Lst',
																	'Rst',
																	'S',
																]),
																z.any().describe('Numbered Source Channel'),
																z.any().describe('Undefined channel'),
															]
															const errors = schemas.reduce<z.ZodError[]>(
																(errors, schema) =>
																	((result) =>
																		result.error
																			? [...errors, result.error]
																			: errors)(schema.safeParse(x)),
																[]
															)
															if (schemas.length - errors.length !== 1) {
																ctx.addIssue({
																	path: ctx.path,
																	code: 'invalid_union',
																	unionErrors: errors,
																	message: 'Invalid input: Should pass single schema',
																})
															}
														})
														.describe('Symbol for this channel (from VSF TR-03 Appendix A)')
														.optional(),
												})
											)
											.min(1)
											.describe('Array of objects describing the audio channels'),
									})
								)
							)
							.describe('Describes an audio Source'),
					]
					const errors = schemas.reduce<z.ZodError[]>(
						(errors, schema) =>
							((result) => (result.error ? [...errors, result.error] : errors))(schema.safeParse(x)),
						[]
					)
					if (schemas.length - errors.length !== 1) {
						ctx.addIssue({
							path: ctx.path,
							code: 'invalid_union',
							unionErrors: errors,
							message: 'Invalid input: Should pass single schema',
						})
					}
				})
			)
			.describe('Describes a Source')
	)
	.min(0)
	.describe('A list of Source resources')
