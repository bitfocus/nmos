import { z } from 'zod'
import { URNControlSchema } from '../../v1.3/zod/_urns'

export default z
	.array(
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
						type: z
							.any()
							.superRefine((x, ctx) => {
								const schemas = [
									z.enum(['urn:x-nmos:device:generic', 'urn:x-nmos:device:pipeline']),
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
							.describe('Device type URN'),
						node_id: z
							.string()
							.regex(
								new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
							)
							.describe(
								'Globally unique identifier for the Node which initially created the Device. This attribute is used to ensure referential integrity by registry implementations.'
							),
						senders: z
							.array(
								z
									.string()
									.regex(
										new RegExp(
											'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
										)
									)
							)
							.describe('UUIDs of Senders attached to the Device'),
						receivers: z
							.array(
								z
									.string()
									.regex(
										new RegExp(
											'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
										)
									)
							)
							.describe('UUIDs of Receivers attached to the Device'),
						controls: z
							.array(
								z.object({
									href: z
										.string()
										.url()
										.describe('URL to reach a control endpoint, whether http or otherwise'),
									type: URNControlSchema.describe('URN identifying the control format'),
								})
							)
							.describe('Control endpoints exposed for the Device'),
					})
				)
			)
			.describe('Describes a Device')
	)
	.min(0)
	.describe('A list of Device resources')
