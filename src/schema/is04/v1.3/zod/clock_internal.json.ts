import { z } from 'zod'

export default z
	.object({
		name: z
			.string()
			.regex(new RegExp('^clk[0-9]+$'))
			.describe('Name of this refclock (unique for this set of clocks)'),
		ref_type: z.literal('internal').describe('Type of external reference used by this clock'),
	})
	.describe('Describes a clock with no external reference')
