import { z } from "zod";

export const _flowAudioCore = z.object({
	format: z
		.literal('urn:x-nmos:format:audio')
		.describe('Format of the data coming from the Flow as a URN'),
	sample_rate: z
		.object({
			numerator: z.number().int().describe('Numerator'),
			denominator: z.number().int().describe('Denominator').default(1),
		})
		.describe('Number of audio samples per second for this Flow'),
})