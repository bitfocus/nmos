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
							device_id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe(
									'Device ID which this Receiver forms part of. This attribute is used to ensure referential integrity by registry implementations.'
								),
							transport: z
								.any()
								.superRefine((x, ctx) => {
									const schemas = [
										z.enum([
											'urn:x-nmos:transport:rtp',
											'urn:x-nmos:transport:rtp.ucast',
											'urn:x-nmos:transport:rtp.mcast',
											'urn:x-nmos:transport:dash',
										]),
										z
											.any()
											.refine(
												(value) => !z.any().safeParse(value).success,
												'Invalid input: Should NOT be valid against schema'
											),
									]
									const errors = schemas.reduce<z.ZodError[]>(
										(errors, schema) =>
											((result) => (result.error ? [...errors, result.error] : errors))(
												schema.safeParse(x)
											),
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
								.describe('Transport type accepted by the Receiver in URN format'),
							interface_bindings: z
								.array(z.string())
								.describe(
									"Binding of Receiver ingress ports to interfaces on the parent Node. Should contain a single network interface unless a redundancy mechanism such as ST.2022-7 is in use, in which case each 'leg' should have its matching interface listed. Where the redundancy mechanism receives more than one copy of the stream via the same interface, that interface should be listed a corresponding number of times."
								),
							subscription: z
								.object({
									sender_id: z
										.union([
											z
												.string()
												.regex(
													new RegExp(
														'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
													)
												)
												.describe(
													'UUID of the Sender that this Receiver is currently subscribed to'
												),
											z
												.null()
												.describe(
													'UUID of the Sender that this Receiver is currently subscribed to'
												)
												.default(null),
										])
										.describe('UUID of the Sender that this Receiver is currently subscribed to')
										.default(null),
									active: z
										.boolean()
										.describe(
											"Receiver is enabled and configured with a Sender's connection parameters"
										)
										.default(false),
								})
								.describe(
									"Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation, or when connected to a non-NMOS Sender."
								),
						})
					)
				)
				.describe('Describes a receiver'),
			z.object({
				format: z.literal('urn:x-nmos:format:video').describe('Type of Flow accepted by the Receiver as a URN'),
				caps: z
					.object({
						media_types: z
							.array(z.union([z.enum(['video/raw', 'video/H264', 'video/vc2']), z.any()]))
							.min(1)
							.describe('Subclassification of the formats accepted using IANA assigned media types')
							.optional(),
					})
					.describe('Capabilities'),
			})
		)
	)
	.describe('Describes a video Receiver')
