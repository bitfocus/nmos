import { z } from 'zod'
import { _nmosResourceBase } from '../../v1.3/zod/_nnosResourceBase'
import { idPrimitive } from '../../v1.3/zod/_primitives'

export default z
	.record(z.any())
	.and(
		z.intersection(
			_nmosResourceBase,
			z.object({
				flow_id: z
					.union([
						z
							.string()
							.regex(
								new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
							)
							.describe('ID of the Flow currently passing via this Sender'),
						z.null().describe('ID of the Flow currently passing via this Sender').default(null),
					])
					.describe('ID of the Flow currently passing via this Sender')
					.default(null),
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
					.describe('Transport type used by the Sender in URN format'),
				device_id: idPrimitive
					.describe(
						'Device ID which this Sender forms part of. This attribute is used to ensure referential integrity by registry implementations.'
					),
				manifest_href: z
					.string()
					.url()
					.describe('HTTP URL to a file describing how to connect to the Sender (SDP for RTP)'),
			})
		)
	)
	.describe('Describes a sender')
