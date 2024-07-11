import { z } from 'zod'

export default z
	.object({
		name: z
			.string()
			.regex(new RegExp('^clk[0-9]+$'))
			.describe('Name of this refclock (unique for this set of clocks)'),
		ref_type: z.literal('ptp').describe('Type of external reference used by this clock'),
		traceable: z.boolean().describe('External refclock is synchronised to International Atomic Time (TAI)'),
		version: z.literal('IEEE1588-2008').describe('Version of PTP reference used by this clock'),
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
				'Lock state of this clock to the external reference. If true, this device follows the external reference, otherwise it has no defined relationship to the external reference'
			),
	})
	.describe('Describes a clock referenced to PTP')
