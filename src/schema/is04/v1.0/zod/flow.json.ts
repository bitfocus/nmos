import { z } from 'zod'
import { idPrimitive } from '../../v1.3/zod/_primitives'

export default z
	.object({
		id: z
			.string()
			.regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
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
			.regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
			.describe('Globally unique identifier for the Source which initially created the Flow'),
		parents: z
			.array(
				idPrimitive
			)
			.describe(
				'Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'
			),
	})
	.describe('Describes a Flow')
