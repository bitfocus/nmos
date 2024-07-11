import { z } from 'zod'

export default z
	.record(z.any())
	.and(
		z.any().superRefine((x, ctx) => {
			const schemas = [
				z.object({
					type: z.literal('node').describe('Singular form of the resource type to be registered').optional(),
					data: z
						.object({
							id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Globally unique identifier for the Node'),
							version: z
								.string()
								.regex(new RegExp('^[0-9]+:[0-9]+$'))
								.describe(
									'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
								),
							label: z.string().describe('Freeform string label for the Node'),
							href: z.string().url().describe("HTTP access href for the Node's API"),
							hostname: z.string().describe('Node hostname (optional)').optional(),
							caps: z.record(z.any()).describe('Capabilities (not yet defined)'),
							services: z
								.array(
									z.object({
										href: z.string().url().describe('URL to reach a service running on the Node'),
										type: z.string().url().describe('URN identifying the type of service'),
									})
								)
								.describe('Array of objects containing a URN format type and href'),
						})
						.describe('Describes the Node and the services which run on it')
						.optional(),
				}),
				z.object({
					type: z
						.literal('device')
						.describe('Singular form of the resource type to be registered')
						.optional(),
					data: z
						.object({
							id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Globally unique identifier for the Device'),
							version: z
								.string()
								.regex(new RegExp('^[0-9]+:[0-9]+$'))
								.describe(
									'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
								),
							label: z.string().describe('Freeform string label for the Device'),
							type: z.string().url().describe('Device type URN'),
							node_id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Globally unique identifier for the Node which initially created the Device'),
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
						})
						.describe('Describes a Device')
						.optional(),
				}),
				z.object({
					type: z
						.literal('sender')
						.describe('Singular form of the resource type to be registered')
						.optional(),
					data: z
						.object({
							id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Globally unique identifier for the Sender'),
							version: z
								.string()
								.regex(new RegExp('^[0-9]+:[0-9]+$'))
								.describe(
									'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
								),
							label: z.string().describe('Freeform string label for the Sender'),
							description: z.string().describe('Detailed description of the Sender'),
							flow_id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
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
							device_id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Device ID which this Sender forms part of'),
							manifest_href: z
								.string()
								.url()
								.describe('HTTP URL to a file describing how to connect to the Sender (SDP for RTP)'),
						})
						.describe('Describes a sender')
						.optional(),
				}),
				z.object({
					type: z
						.literal('receiver')
						.describe('Singular form of the resource type to be registered')
						.optional(),
					data: z
						.object({
							id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Globally unique identifier for the Receiver'),
							version: z
								.string()
								.regex(new RegExp('^[0-9]+:[0-9]+$'))
								.describe(
									'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
								),
							label: z.string().describe('Freeform string label for the Receiver'),
							description: z.string().describe('Detailed description of the Receiver'),
							format: z
								.enum(['urn:x-nmos:format:video', 'urn:x-nmos:format:audio', 'urn:x-nmos:format:data'])
								.describe('Type of Flow accepted by the Receiver as a URN'),
							caps: z.record(z.any()).describe('Capabilities (not yet defined)'),
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
									'Key value set of freeform string tags to aid in filtering sources. Values should be represented as an array of strings. Can be empty.'
								),
							device_id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Device ID which this Receiver forms part of'),
							transport: z
								.enum([
									'urn:x-nmos:transport:rtp',
									'urn:x-nmos:transport:rtp.ucast',
									'urn:x-nmos:transport:rtp.mcast',
									'urn:x-nmos:transport:dash',
								])
								.describe('Transport type accepted by the Receiver in URN format'),
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
								})
								.describe(
									"Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation."
								),
						})
						.describe('Describes a receiver')
						.optional(),
				}),
				z.object({
					type: z
						.literal('source')
						.describe('Singular form of the resource type to be registered')
						.optional(),
					data: z
						.object({
							id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Globally unique identifier for the Source'),
							version: z
								.string()
								.regex(new RegExp('^[0-9]+:[0-9]+$'))
								.describe(
									'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
								),
							label: z.string().describe('Freeform string label for the Source'),
							description: z.string().describe('Detailed description of the Source'),
							format: z
								.enum(['urn:x-nmos:format:video', 'urn:x-nmos:format:audio', 'urn:x-nmos:format:data'])
								.describe('Format of the data coming from the Source as a URN'),
							caps: z.record(z.any()).describe('Capabilities (not yet defined)'),
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
									'Key value set of freeform string tags to aid in filtering Sources. Values should be represented as an array of strings. Can be empty.'
								),
							device_id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe(
									'Globally unique identifier for the Device which initially created the Source'
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
									'Array of UUIDs representing the Source IDs of Grains which came together at the input to this Source (may change over the lifetime of this Source)'
								),
						})
						.describe('Describes a Source')
						.optional(),
				}),
				z.object({
					type: z.literal('flow').describe('Singular form of the resource type to be registered').optional(),
					data: z
						.object({
							id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Globally unique identifier for the Flow'),
							version: z
								.string()
								.regex(new RegExp('^[0-9]+:[0-9]+$'))
								.describe(
									'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
								),
							label: z.string().describe('Freeform string label for the Flow'),
							description: z.string().describe('Detailed description of the Flow'),
							format: z
								.enum(['urn:x-nmos:format:video', 'urn:x-nmos:format:audio', 'urn:x-nmos:format:data'])
								.describe('Format of the data coming from the Flow as a URN'),
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
									'Key value set of freeform string tags to aid in filtering Flows. Values should be represented as an array of strings. Can be empty.'
								),
							source_id: z
								.string()
								.regex(
									new RegExp(
										'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
									)
								)
								.describe('Globally unique identifier for the Source which initially created the Flow'),
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
						.describe('Describes a Flow')
						.optional(),
				}),
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
	)
	.describe('Register a new resource or update an existing resource')
