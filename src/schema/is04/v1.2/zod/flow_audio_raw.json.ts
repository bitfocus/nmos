import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { idPrimitive } from './_primitives'
import { _flowBase } from './_flowBase'

export default z
	.record(z.any())
	.and(
		z.intersection(
			z
				.record(z.any())
				.and(
					z.intersection(
						z
							.record(z.any())
							.and(
								z.intersection(
									
										_nmosResourceBase,
									_flowBase
								)
							)
							.describe('Describes a Flow'),
						z.object({
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
					)
				)
				.describe('Describes an audio Flow'),
			z.object({
				media_type: z
					.union([z.enum(['audio/L24', 'audio/L20', 'audio/L16', 'audio/L8']), z.any()])
					.describe('Subclassification of the format using IANA assigned media types'),
				bit_depth: z.number().int().describe('Bit depth of the audio samples'),
			})
		)
	)
	.describe('Describes a raw audio Flow')
