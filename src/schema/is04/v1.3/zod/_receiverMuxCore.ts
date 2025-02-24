import { z } from "zod";

const receiverMuxCaps = z
	.object({
		media_types: z
			.array(z.union([z.literal('video/SMPTE2022-6'), z.any()]))
			.min(1)
			.describe(
				'Subclassification of the formats accepted using IANA assigned media types'
			)
			.optional(),
	});

export const _receiverMuxCore = z.object({
	format: z
		.literal('urn:x-nmos:format:mux')
		.describe('Type of Flow accepted by the Receiver as a URN'),
	caps: receiverMuxCaps
		.describe('Capabilities'),
});
