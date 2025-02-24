import { z } from 'zod'
import { _nmosResourceBase } from '../../v1.3/zod/_nnosResourceBase'
import { idPrimitive } from '../../v1.3/zod/_primitives'

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
									.describe('UUID of the Sender that this Receiver is currently subscribed to'),
								z
									.null()
									.describe('UUID of the Sender that this Receiver is currently subscribed to')
									.default(null),
							])
							.describe('UUID of the Sender that this Receiver is currently subscribed to')
							.default(null),
						active: z
							.boolean()
							.describe("Receiver is enabled and configured with a Sender's connection parameters")
							.default(false),
					})
					.describe(
						"Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation, or when connected to a non-NMOS Sender."
					),
			})
		)
	)
	.describe('Describes a receiver')
