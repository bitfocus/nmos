import { z } from 'zod'

export default z
	.object({
		multicast_ip: z
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
		destination_ip: z
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
			.describe('The constraints for a single transport parameter'),
		source_ip: z
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
		interface_ip: z
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
		fec_enabled: z
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
		fec_destination_ip: z
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
		fec_mode: z
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
		fec_type: z
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
		fec_block_width: z
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
		fec_block_height: z
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
		fec1D_destination_port: z
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
		fec2D_destination_port: z
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
		fec1D_source_port: z
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
		fec2D_source_port: z
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
		rtcp_enabled: z
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
		rtcp_destination_ip: z
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
		rtcp_destination_port: z
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
		rtcp_source_port: z
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
		rtp_enabled: z
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
			let evaluated = [
				'multicast_ip',
				'destination_ip',
				'destination_port',
				'source_ip',
				'interface_ip',
				'source_port',
				'fec_enabled',
				'fec_destination_ip',
				'fec_mode',
				'fec_type',
				'fec_block_width',
				'fec_block_height',
				'fec1D_destination_port',
				'fec2D_destination_port',
				'fec1D_source_port',
				'fec2D_source_port',
				'rtcp_enabled',
				'rtcp_destination_ip',
				'rtcp_destination_port',
				'rtcp_source_port',
				'rtp_enabled',
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
		'Used to express the dynamic constraints on RTP transport parameters. These constraints may be set and changed at run time. Every transport parameter must have an entry, even if it is only an empty object.'
	)
