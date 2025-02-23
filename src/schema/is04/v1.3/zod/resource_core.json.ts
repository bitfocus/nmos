import { z } from 'zod'
import { idPrimitive, versionPrimitive } from './_primitives'
import { tags } from './_propTags'

export default z
	.object({
		id: idPrimitive
			.describe('Globally unique identifier for the resource'),
		version: 
			versionPrimitive
			.describe(
				'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
			),
		label: z.string().describe('Freeform string label for the resource'),
		description: z.string().describe('Detailed description of the resource'),
		tags: tags
			.describe(
				'Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'
			),
	})
	.describe('Describes the foundations of all NMOS resources')
