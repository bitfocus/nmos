import { z } from "zod";

const _receiverDataCaps = z
	.object({
		media_types: z
			.array(
				z.union([
					z.enum(['video/smpte291', 'application/json']),
					z.any(),
				])
			)
			.min(1)
			.describe(
				'Subclassification of the formats accepted using IANA assigned media types'
			)
			.optional(),
		event_types: z
			.array(z.string())
			.min(1)
			.describe(
				'Subclassification of the event types accepted defined by the AMWA IS-07 specification'
			)
			.optional(),
	});
export const _receiverDataCore = z.object({
	format: z
		.literal('urn:x-nmos:format:data')
		.describe('Type of Flow accepted by the Receiver as a URN'),
	caps: _receiverDataCaps
		.describe('Capabilities'),
});
