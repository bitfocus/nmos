import { z } from 'zod'

export default z
	.record(z.any())
	.and(
		z.intersection(
			z
				.object({
					id: z
						.string()
						.regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
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
				caps: z.object({}).describe('Capabilities of this sender').optional(),
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
				device_id: z
					.string()
					.regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
					.describe(
						'Device ID which this Sender forms part of. This attribute is used to ensure referential integrity by registry implementations.'
					),
				manifest_href: z
					.string()
					.url()
					.describe(
						"HTTP URL to a file describing how to connect to the Sender (SDP for RTP). The Sender's 'version' attribute should be updated if the contents of this file are modified. This URL may return an HTTP 404 where the 'active' parameter in the 'subscription' object is present and set to false (v1.2+ only)."
					),
				interface_bindings: z
					.array(z.string())
					.describe(
						"Binding of Sender egress ports to interfaces on the parent Node. Should contain a single network interface unless a redundancy mechanism such as ST.2022-7 is in use, in which case each 'leg' should have its matching interface listed. Where the redundancy mechanism sends more than one copy of the stream via the same interface, that interface should be listed a corresponding number of times."
					),
				subscription: z
					.object({
						receiver_id: z
							.union([
								z
									.string()
									.regex(
										new RegExp(
											'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
										)
									)
									.describe('UUID of the Receiver that this Sender is currently subscribed to'),
								z
									.null()
									.describe('UUID of the Receiver that this Sender is currently subscribed to')
									.default(null),
							])
							.describe('UUID of the Receiver that this Sender is currently subscribed to')
							.default(null),
						active: z
							.boolean()
							.describe(
								'Sender is enabled and configured to stream data to a single Receiver (unicast), or to the network via multicast or a pull-based mechanism'
							)
							.default(false),
					})
					.describe(
						"Object containing the 'receiver_id' currently subscribed to (unicast only). Receiver_id should be null on initialisation, or when connected to a non-NMOS unicast Receiver."
					),
			})
		)
	)
	.describe('Describes a sender')
