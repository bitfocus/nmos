import { z } from 'zod'

export default z
	.object({
		mode: z
			.union([z.enum(['activate_immediate', 'activate_scheduled_absolute', 'activate_scheduled_relative']), z.null()])
			.describe(
				'Mode of activation: immediate (on message receipt), scheduled_absolute (when internal clock >= requested_time), scheduled_relative (when internal clock >= time of message receipt + requested_time), or null (no activation scheduled)'
			),
		requested_time: z
			.union([z.string().regex(new RegExp('^[0-9]+:[0-9]+$')), z.null()])
			.describe(
				"String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating time (absolute or relative) for activation. Should be null or not present if 'mode' is null."
			)
			.optional(),
	})
	.strict()
	.describe('Parameters concerned with activation of the transport parameters')
