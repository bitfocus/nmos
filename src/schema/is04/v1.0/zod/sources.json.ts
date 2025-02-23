import { z } from 'zod'

export default z
	.array(
		z
			.object({
				id: idPrimitive
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
				device_id: idPrimitive
					.describe('Globally unique identifier for the Device which initially created the Source'),
				parents: z
					.array(
						z
							.string()
							.regex(
								new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
							)
					)
					.describe(
						'Array of UUIDs representing the Source IDs of Grains which came together at the input to this Source (may change over the lifetime of this Source)'
					),
			})
			.describe('Describes a Source')
	)
	.min(0)
	.describe('A list of Source resources')
