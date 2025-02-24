import { z } from "zod";

const _receiverVideoCaps = z.object({
	media_types: z
		.array(
			z.union([
				z.enum(['video/raw', 'video/H264', 'video/vc2']),
				z.any(),
			])
		)
		.min(1)
		.describe(
			'Subclassification of the formats accepted using IANA assigned media types'
		).optional(),
});
export const _receiverVideoCore = z.object({
	format: z
		.literal('urn:x-nmos:format:video')
		.describe('Type of Flow accepted by the Receiver as a URN'),
	caps: _receiverVideoCaps
		.describe('Capabilities'),
});
