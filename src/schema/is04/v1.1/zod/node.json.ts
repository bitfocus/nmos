import { z } from 'zod'

export default z
	.record(z.any())
	.and(
		z.intersection(
			z
				.object({
					id: z
						.string()
						.regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
						.describe('Globally unique identifier for the resource'),
					version: z
						.string()
						.regex(new RegExp('^[0-9]+:[0-9]+$'))
						.describe(
							'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
						),
					label: z.string().describe('Freeform string label for the resource'),
					description: z.string().describe('Detailed description of the resource'),
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
							'Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'
						),
				})
				.describe('Describes the foundations of all NMOS resources'),
			z.object({
				href: z.string().url().describe("HTTP access href for the Node's API (deprecated)"),
				hostname: z.string().describe('Node hostname (optional, deprecated)').optional(),
				api: z
					.object({
						versions: z
							.array(z.string().regex(new RegExp('v[0-9]+.[0-9]+')))
							.describe('Supported API versions running on this Node'),
						endpoints: z
							.array(
								z.object({
									host: z
										.union([z.any(), z.any(), z.any()])
										.describe('IP address or hostname which the Node API is running on'),
									port: z
										.number()
										.int()
										.gte(1)
										.lte(65535)
										.describe('Port number which the Node API is running on'),
									protocol: z
										.enum(['http', 'https'])
										.describe('Protocol supported by this instance of the Node API'),
								})
							)
							.describe('Host, port and protocol details required to connect to the API'),
					})
					.describe('URL fragments required to connect to the Node API'),
				caps: z.record(z.any()).describe('Capabilities (not yet defined)'),
				services: z
					.array(
						z.object({
							href: z.string().url().describe('URL to reach a service running on the Node'),
							type: z.string().url().describe('URN identifying the type of service'),
						})
					)
					.describe('Array of objects containing a URN format type and href'),
				clocks: z
					.array(
						z.union([
							z
								.object({
									name: z
										.string()
										.regex(new RegExp('^clk[0-9]+$'))
										.describe('Name of this refclock (unique for this set of clocks)'),
									ref_type: z
										.literal('internal')
										.describe('Type of external reference used by this clock'),
								})
								.describe('Describes a clock with no external reference'),
							z
								.object({
									name: z
										.string()
										.regex(new RegExp('^clk[0-9]+$'))
										.describe('Name of this refclock (unique for this set of clocks)'),
									ref_type: z
										.literal('ptp')
										.describe('Type of external reference used by this clock'),
									traceable: z
										.boolean()
										.describe(
											'External refclock is synchronised to International Atomic Time (TAI)'
										),
									version: z
										.literal('IEEE1588-2008')
										.describe('Version of PTP reference used by this clock'),
									gmid: z
										.string()
										.regex(
											new RegExp(
												'^[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}$'
											)
										)
										.describe('ID of the PTP reference used by this clock'),
									locked: z
										.boolean()
										.describe(
											'Lock state of this clock to the external reference. If true, this device is slaved, otherwise it has no defined relationship to the external reference'
										),
								})
								.describe('Describes a clock referenced to PTP'),
						])
					)
					.describe('Clocks made available to Devices owned by this Node'),
			})
		)
	)
	.describe('Describes the Node and the services which run on it')
