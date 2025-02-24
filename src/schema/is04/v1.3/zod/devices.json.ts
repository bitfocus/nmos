import { z } from 'zod'
import { idPrimitive } from './_primitives'

export default z
	.array(
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
									z.any(),
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
						node_id: idPrimitive
							.describe(
								'Globally unique identifier for the Node which initially created the Device. This attribute is used to ensure referential integrity by registry implementations.'
							),
						senders: z
							.array(
								idPrimitive
							)
							.describe('UUIDs of Senders attached to the Device (deprecated)'),
						receivers: z
							.array(
								idPrimitive
							)
							.describe('UUIDs of Receivers attached to the Device (deprecated)'),
						controls: z
							.array(
								z.object({
									href: z
										.string()
										.url()
										.describe('URL to reach a control endpoint, whether http or otherwise'),
									type: z.string().url().describe('URN identifying the control format'),
									authorization: z
										.boolean()
										.describe('This endpoint requires authorization')
										.default(false),
								})
							)
							.describe('Control endpoints exposed for the Device'),
					})
				)
			)
			.describe('Describes a Device')
	)
	.describe('A list of Device resources')
