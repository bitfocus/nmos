import { z } from 'zod'

export default z
	.object({
		connection_uri: z
			.object({
				maximum: z
					.union([
						z.number().int().describe('The inclusive maximum value the parameter can be set to'),
						z.number().describe('The inclusive maximum value the parameter can be set to'),
					])
					.describe('The inclusive maximum value the parameter can be set to')
					.optional(),
				minimum: z
					.union([
						z.number().int().describe('The inclusive minimum value the parameter can be set to'),
						z.number().describe('The inclusive minimum value the parameter can be set to'),
					])
					.describe('The inclusive minimum value the parameter can be set to')
					.optional(),
				enum: z
					.array(z.union([z.boolean(), z.number().int(), z.null(), z.number(), z.string()]))
					.min(1)
					.describe('An array of allowed values')
					.optional(),
				pattern: z.string().describe('A regex pattern that must be satisfied for this parameter').optional(),
				description: z.string().describe('A human readable string describing the constraint (optional)').optional(),
			})
			.strict()
			.describe('The constraints for a single transport parameter'),
		connection_authorization: z
			.object({
				maximum: z
					.union([
						z.number().int().describe('The inclusive maximum value the parameter can be set to'),
						z.number().describe('The inclusive maximum value the parameter can be set to'),
					])
					.describe('The inclusive maximum value the parameter can be set to')
					.optional(),
				minimum: z
					.union([
						z.number().int().describe('The inclusive minimum value the parameter can be set to'),
						z.number().describe('The inclusive minimum value the parameter can be set to'),
					])
					.describe('The inclusive minimum value the parameter can be set to')
					.optional(),
				enum: z
					.array(z.union([z.boolean(), z.number().int(), z.null(), z.number(), z.string()]))
					.min(1)
					.describe('An array of allowed values')
					.optional(),
				pattern: z.string().describe('A regex pattern that must be satisfied for this parameter').optional(),
				description: z.string().describe('A human readable string describing the constraint (optional)').optional(),
			})
			.strict()
			.describe('The constraints for a single transport parameter'),
	})
	.catchall(
		z.union([
			z
				.object({
					maximum: z
						.union([
							z.number().int().describe('The inclusive maximum value the parameter can be set to'),
							z.number().describe('The inclusive maximum value the parameter can be set to'),
						])
						.describe('The inclusive maximum value the parameter can be set to')
						.optional(),
					minimum: z
						.union([
							z.number().int().describe('The inclusive minimum value the parameter can be set to'),
							z.number().describe('The inclusive minimum value the parameter can be set to'),
						])
						.describe('The inclusive minimum value the parameter can be set to')
						.optional(),
					enum: z
						.array(z.union([z.boolean(), z.number().int(), z.null(), z.number(), z.string()]))
						.min(1)
						.describe('An array of allowed values')
						.optional(),
					pattern: z.string().describe('A regex pattern that must be satisfied for this parameter').optional(),
					description: z.string().describe('A human readable string describing the constraint (optional)').optional(),
				})
				.strict()
				.describe('The constraints for a single transport parameter'),
			z.never(),
		])
	)
	.superRefine((value, ctx) => {
		for (const key in value) {
			let evaluated = ['connection_uri', 'connection_authorization'].includes(key)
			if (key.match(new RegExp('^ext_[a-zA-Z0-9_]+$'))) {
				evaluated = true
				const result = z
					.object({
						maximum: z
							.union([
								z.number().int().describe('The inclusive maximum value the parameter can be set to'),
								z.number().describe('The inclusive maximum value the parameter can be set to'),
							])
							.describe('The inclusive maximum value the parameter can be set to')
							.optional(),
						minimum: z
							.union([
								z.number().int().describe('The inclusive minimum value the parameter can be set to'),
								z.number().describe('The inclusive minimum value the parameter can be set to'),
							])
							.describe('The inclusive minimum value the parameter can be set to')
							.optional(),
						enum: z
							.array(z.union([z.boolean(), z.number().int(), z.null(), z.number(), z.string()]))
							.min(1)
							.describe('An array of allowed values')
							.optional(),
						pattern: z.string().describe('A regex pattern that must be satisfied for this parameter').optional(),
						description: z.string().describe('A human readable string describing the constraint (optional)').optional(),
					})
					.strict()
					.describe('The constraints for a single transport parameter')
					.safeParse(value[key])
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
			if (!evaluated) {
				const result = z.never().safeParse(value[key])
				if (!result.success) {
					ctx.addIssue({
						path: [...ctx.path, key],
						code: 'custom',
						message: `Invalid input: must match catchall schema`,
						params: {
							issues: result.error.issues,
						},
					})
				}
			}
		}
	})
	.describe(
		'Used to express the dynamic constraints on WebSocket transport parameters. These constraints may be set and changed at run time. Every transport parameter must have an entry, even if it is only an empty object.'
	)
