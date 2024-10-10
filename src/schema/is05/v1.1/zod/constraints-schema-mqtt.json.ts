import { z } from 'zod'

export default z
	.object({
		destination_host: z
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
			.optional(),
		source_host: z
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
			.optional(),
		broker_topic: z
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
		broker_protocol: z
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
		broker_authorization: z
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
		connection_status_broker_topic: z
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
		source_port: z
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
			.optional(),
		destination_port: z
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
			.optional(),
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
			let evaluated = [
				'destination_host',
				'source_host',
				'broker_topic',
				'broker_protocol',
				'broker_authorization',
				'connection_status_broker_topic',
				'source_port',
				'destination_port',
			].includes(key)
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
		'Used to express the dynamic constraints on MQTT transport parameters. These constraints may be set and changed at run time. Every transport parameter must have an entry, even if it is only an empty object.'
	)
