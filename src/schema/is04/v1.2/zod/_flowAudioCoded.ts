import { z } from "zod";

export const _flowAudioCoded = z.object({
	media_type: z
		.any()
		.refine(
			(value) => !z.any().safeParse(value).success,
			'Invalid input: Should NOT be valid against schema'
		)
		.describe('Subclassification of the format using IANA assigned media types'),
})