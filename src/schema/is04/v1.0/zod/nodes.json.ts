import { z } from 'zod'

export default z
	.array(
		z
			.object({
				id: idPrimitive
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
	)
	.min(0)
	.describe('A list of Node resources')
