import { z } from "zod";

const _receiverAudioCaps = z.object({
	media_types: z
		.array(
			z.union([
				z.enum(['audio/L24', 'audio/L20', 'audio/L16', 'audio/L8']),
				z.any(),
			])
		)
		.min(1)
		.describe(
			'Subclassification of the formats accepted using IANA assigned media types'
		)
		.optional(),
});
export const _receiverAudioCore = z.object({
	format: z
		.literal('urn:x-nmos:format:audio')
		.describe('Type of Flow accepted by the Receiver as a URN'),
	caps: _receiverAudioCaps
		.describe('Capabilities'),
});
