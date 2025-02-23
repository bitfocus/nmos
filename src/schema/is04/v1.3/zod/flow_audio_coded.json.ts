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
					.any()
					.refine(
						(value) => !z.any().safeParse(value).success,
						'Invalid input: Should NOT be valid against schema'
					)
					.describe('Subclassification of the format using IANA assigned media types'),
			})
		)
	)
	.describe('Describes a coded audio Flow')
