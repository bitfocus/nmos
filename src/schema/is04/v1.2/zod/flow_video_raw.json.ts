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
								.literal('urn:x-nmos:format:video')
								.describe('Format of the data coming from the Flow as a URN'),
							frame_width: z.number().int().describe('Width of the picture in pixels'),
							frame_height: z.number().int().describe('Height of the picture in pixels'),
							interlace_mode: z
								.enum(['progressive', 'interlaced_tff', 'interlaced_bff', 'interlaced_psf'])
								.describe('Interlaced video mode for frames in this Flow')
								.default('progressive'),
							colorspace: z
								.union([z.enum(['BT601', 'BT709', 'BT2020', 'BT2100']), z.any()])
								.describe(
									'Colorspace used for the video. Any values not defined in the enum should be defined in the NMOS Parameter Registers'
								),
							transfer_characteristic: z
								.union([z.enum(['SDR', 'HLG', 'PQ']), z.any()])
								.describe(
									'Transfer characteristic. Any values not defined in the enum should be defined in the NMOS Parameter Registers'
								)
								.default('SDR'),
						})
					)
				)
				.describe('Describes a Video Flow'),
			z.object({
				media_type: z
					.literal('video/raw')
					.describe('Subclassification of the format using IANA assigned media types'),
				components: z
					.array(
						z.object({
							name: z
								.enum(['Y', 'Cb', 'Cr', 'I', 'Ct', 'Cp', 'A', 'R', 'G', 'B', 'DepthMap'])
								.describe('Name of this component'),
							width: z.number().int().describe('Width of this component in pixels'),
							height: z.number().int().describe('Height of this component in pixels'),
							bit_depth: z.number().int().describe('Number of bits used to describe each sample'),
						})
					)
					.min(1)
					.describe('Array of objects describing the components'),
			})
		)
	)
	.describe('Describes a raw Video Flow')
