import { z } from 'zod'

export default z
	.array(
		z
			.object({
				id: z
					.string()
					.regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
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
					.regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
					.describe('Globally unique identifier for the Node which initially created the Device'),
				senders: z
					.array(
						z
							.string()
							.regex(
								new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
							)
					)
					.describe('UUIDs of Senders attached to the Device'),
				receivers: z
					.array(
						z
							.string()
							.regex(
								new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
							)
					)
					.describe('UUIDs of Receivers attached to the Device'),
			})
			.describe('Describes a Device')
	)
	.min(0)
	.describe('A list of Device resources')
