import { z } from 'zod'
import { idPrimitive } from '../../v1.3/zod/_primitives'

export default z
	.array(
		z
			.object({
				id: idPrimitive
					.describe('Globally unique identifier for the Sender'),
				version: z
					.string()
					.regex(new RegExp('^[0-9]+:[0-9]+$'))
					.describe(
						'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
					),
				label: z.string().describe('Freeform string label for the Sender'),
				description: z.string().describe('Detailed description of the Sender'),
				flow_id: idPrimitive
					.describe('ID of the Flow currently passing via this Sender'),
				transport: z
					.enum([
						'urn:x-nmos:transport:rtp',
						'urn:x-nmos:transport:rtp.ucast',
						'urn:x-nmos:transport:rtp.mcast',
						'urn:x-nmos:transport:dash',
					])
					.describe('Transport type used by the Sender in URN format'),
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
						'Key value set of freeform string tags to aid in filtering Senders. Values should be represented as an array of strings. Can be empty.'
					)
					.optional(),
				device_id: idPrimitive
					.describe('Device ID which this Sender forms part of'),
				manifest_href: z
					.string()
					.url()
					.describe('HTTP URL to a file describing how to connect to the Sender (SDP for RTP)'),
			})
			.describe('Describes a sender')
	)
	.min(0)
	.describe('A list of Sender resources')
