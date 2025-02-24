import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { idPrimitive } from './_primitives'

export default z
	.record(z.any())
	.and(
		z.intersection(
			_nmosResourceBase,
			z.object({
				device_id: idPrimitive
					.describe(
						'Device ID which this Receiver forms part of. This attribute is used to ensure referential integrity by registry implementations.'
					),
				transport: z
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
					.describe('Transport type accepted by the Receiver in URN format'),
				interface_bindings: z
					.array(z.string())
					.describe('Binding of Receiver ingress ports to interfaces on the parent Node.'),
				subscription: z
					.object({
						sender_id: z
							.union([
								idPrimitive
									.describe(
										'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
									),
								z
									.null()
									.describe(
										'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
									)
									.default(null),
							])
							.describe(
								'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
							)
							.default(null),
						active: z
							.boolean()
							.describe('Receiver is enabled and configured to receive data')
							.default(false),
					})
					.describe('Object indicating how this Receiver is currently configured to receive data.'),
			})
		)
	)
	.describe('Describes a receiver')
