import { z } from 'zod'
import { idPrimitive } from './_primitives'

export default z
	.array(
		z
			.record(z.any())
			.and(
				z.union([
					z
						.record(z.any())
						.and(
							z.intersection(
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
																	.describe(
																		'Globally unique identifier for the resource'
																	),
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
															.describe(
																'Describes the foundations of all NMOS resources'
															),
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
													.literal('urn:x-nmos:format:video')
													.describe('Format of the data coming from the Flow as a URN'),
												frame_width: z
													.number()
													.int()
													.describe('Width of the picture in pixels'),
												frame_height: z
													.number()
													.int()
													.describe('Height of the picture in pixels'),
												interlace_mode: z
													.enum([
														'progressive',
														'interlaced_tff',
														'interlaced_bff',
														'interlaced_psf',
													])
													.describe('Interlaced video mode for frames in this Flow')
													.default('progressive'),
												colorspace: z
													.union([z.enum(['BT601', 'BT709', 'BT2020', 'BT2100']), z.any()])
													.describe(
														'Colorspace used for the video. Any values not defined in the enum should be defined in the NMOS Parameter Registers'
													),
												transfer_characteristic: z
													.union([z.enum(['SDR', 'HLG', 'PQ']), z.any()])
													.describe(
														'Transfer characteristic. Any values not defined in the enum should be defined in the NMOS Parameter Registers'
													)
													.default('SDR'),
											})
										)
									)
									.describe('Describes a Video Flow'),
								z.object({
									media_type: z
										.literal('video/raw')
										.describe('Subclassification of the format using IANA assigned media types'),
									components: z
										.array(
											z.object({
												name: z
													.enum([
														'Y',
														'Cb',
														'Cr',
														'I',
														'Ct',
														'Cp',
														'A',
														'R',
														'G',
														'B',
														'DepthMap',
													])
													.describe('Name of this component'),
												width: z.number().int().describe('Width of this component in pixels'),
												height: z.number().int().describe('Height of this component in pixels'),
												bit_depth: z
													.number()
													.int()
													.describe('Number of bits used to describe each sample'),
											})
										)
										.min(1)
										.describe('Array of objects describing the components'),
								})
							)
						)
						.describe('Describes a raw Video Flow'),
					z
						.record(z.any())
						.and(
							z.intersection(
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
																	.describe(
																		'Globally unique identifier for the resource'
																	),
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
															.describe(
																'Describes the foundations of all NMOS resources'
															),
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
													.literal('urn:x-nmos:format:video')
													.describe('Format of the data coming from the Flow as a URN'),
												frame_width: z
													.number()
													.int()
													.describe('Width of the picture in pixels'),
												frame_height: z
													.number()
													.int()
													.describe('Height of the picture in pixels'),
												interlace_mode: z
													.enum([
														'progressive',
														'interlaced_tff',
														'interlaced_bff',
														'interlaced_psf',
													])
													.describe('Interlaced video mode for frames in this Flow')
													.default('progressive'),
												colorspace: z
													.union([z.enum(['BT601', 'BT709', 'BT2020', 'BT2100']), z.any()])
													.describe(
														'Colorspace used for the video. Any values not defined in the enum should be defined in the NMOS Parameter Registers'
													),
												transfer_characteristic: z
													.union([z.enum(['SDR', 'HLG', 'PQ']), z.any()])
													.describe(
														'Transfer characteristic. Any values not defined in the enum should be defined in the NMOS Parameter Registers'
													)
													.default('SDR'),
											})
										)
									)
									.describe('Describes a Video Flow'),
								z.object({
									media_type: z
										.union([z.enum(['video/H264', 'video/vc2']), z.any()])
										.describe('Subclassification of the format using IANA assigned media types'),
								})
							)
						)
						.describe('Describes a coded Video Flow'),
					z
						.record(z.any())
						.and(
							z.intersection(
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
																	.describe(
																		'Globally unique identifier for the resource'
																	),
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
															.describe(
																'Describes the foundations of all NMOS resources'
															),
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
														denominator: z
															.number()
															.int()
															.describe('Denominator')
															.default(1),
													})
													.describe('Number of audio samples per second for this Flow'),
											})
										)
									)
									.describe('Describes an audio Flow'),
								z.object({
									media_type: z
										.union([z.enum(['audio/L24', 'audio/L20', 'audio/L16', 'audio/L8']), z.any()])
										.describe('Subclassification of the format using IANA assigned media types'),
									bit_depth: z.number().int().describe('Bit depth of the audio samples'),
								})
							)
						)
						.describe('Describes a raw audio Flow'),
					z
						.record(z.any())
						.and(
							z.intersection(
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
																	.describe(
																		'Globally unique identifier for the resource'
																	),
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
															.describe(
																'Describes the foundations of all NMOS resources'
															),
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
														denominator: z
															.number()
															.int()
															.describe('Denominator')
															.default(1),
													})
													.describe('Number of audio samples per second for this Flow'),
											})
										)
									)
									.describe('Describes an audio Flow'),
								z.object({
									media_type: z
										.any()
										.refine(
											(value) => !z.any().safeParse(value).success,
											'Invalid input: Should NOT be valid against schema'
										)
										.describe('Subclassification of the format using IANA assigned media types'),
								})
							)
						)
						.describe('Describes a coded audio Flow'),
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
													id: idPrimitive
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
														idPrimitive
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
										.literal('urn:x-nmos:format:data')
										.describe('Format of the data coming from the Flow as a URN'),
									media_type: z
										.any()
										.refine(
											(value) =>
												!z.enum(['video/smpte291', 'application/json']).safeParse(value)
													.success,
											'Invalid input: Should NOT be valid against schema'
										)
										.describe('Subclassification of the format using IANA assigned media types'),
								})
							)
						)
						.describe('Describes a generic data Flow'),
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
													id: idPrimitive
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
														idPrimitive
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
										.literal('urn:x-nmos:format:data')
										.describe('Format of the data coming from the Flow as a URN'),
									media_type: z
										.literal('video/smpte291')
										.describe('Subclassification of the format using IANA assigned media types'),
									DID_SDID: z
										.array(
											z.object({
												DID: z
													.string()
													.regex(new RegExp('^0x[0-9a-fA-F]{2}$'))
													.describe('Data identification word')
													.optional(),
												SDID: z
													.string()
													.regex(new RegExp('^0x[0-9a-fA-F]{2}$'))
													.describe('Secondary data identification word')
													.optional(),
											})
										)
										.describe('List of Data identification and Secondary data identification words')
										.optional(),
								})
							)
						)
						.describe('Describes an SDI ancillary Flow'),
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
													id: idPrimitive
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
														idPrimitive
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
										.literal('urn:x-nmos:format:data')
										.describe('Format of the data coming from the Flow as a URN'),
									media_type: z
										.literal('application/json')
										.describe('Subclassification of the format using IANA assigned media types'),
									event_type: z
										.string()
										.describe('Event type generated by this Flow, if applicable')
										.optional(),
								})
							)
						)
						.describe('Describes a JSON based Flow'),
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
													id: idPrimitive
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
														idPrimitive
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
										.literal('urn:x-nmos:format:mux')
										.describe('Format of the data coming from the Flow as a URN'),
									media_type: z
										.union([z.literal('video/SMPTE2022-6'), z.any()])
										.describe('Subclassification of the format using IANA assigned media types'),
								})
							)
						)
						.describe('Describes a mux Flow'),
				])
			)
			.describe('Describes a Flow')
	)
	.describe('A list of Flow resources')
