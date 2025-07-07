import { z } from 'zod'

export const _flowDataGenericCore = z.object({
	format: z.literal('urn:x-nmos:format:data').describe('Format of the data coming from the Flow as a URN'),
	media_type: z
		.any()
		.refine(
			(value) => !z.enum(['video/smpte291', 'application/json']).safeParse(value).success,
			'Invalid input: Should NOT be valid against schema',
		)
		.describe('Subclassification of the format using IANA assigned media types'),
})
