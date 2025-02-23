import { z } from "zod";

export const _flowAudioRaw = z.object({
	media_type: z
		.union([z.enum(['audio/L24', 'audio/L20', 'audio/L16', 'audio/L8']), z.any()])
		.describe('Subclassification of the format using IANA assigned media types'),
	bit_depth: z.number().int().describe('Bit depth of the audio samples'),
})