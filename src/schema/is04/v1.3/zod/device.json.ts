import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { idPrimitive } from './_primitives'

export default z
	.record(z.any())
	.and(
		z.intersection(
			_nmosResourceBase,
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
							authorization: z.boolean().describe('This endpoint requires authorization').default(false),
						})
					)
					.describe('Control endpoints exposed for the Device'),
			})
		)
	)
	.describe('Describes a Device')
