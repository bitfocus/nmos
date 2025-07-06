import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { _flowBase } from './_flowBase'
import { _flowVideoCore } from './_flowVideoCore'
import { _flowAudioCore } from './_flowAudioCore'
import { _flowVideoRaw, _flowVideoRawComponent } from './_flowVideoRaw'
import { _flowVideoCodedH264, _flowVideoCodedVC2 } from './_flowVideoCoded'
import { _flowAudioRaw } from './_flowAudioRaw'
import { _flowMuxCore } from './_flowMuxCore'
import { _flowDataJSONCore } from './_flowDataJSONCore'
import { _flowDataSDIAncillaryCore } from './_flowDataSDIAncilleryCore'
import { _flowDataCore } from './_flowDataCore'
import { _flowDataEventCore } from './_flowDataEventCore'

const _flowVideoFuture = z.object({
	media_type: z.string().startsWith('video/'),
	components: z.array(_flowVideoRawComponent).min(1).describe('Array of objects describing the components'),
})

const _flowAudioFuture = z.object({
	media_type: z.string().startsWith('audio/'),
})

export const looseFlow = z.object({
	sample_rate: z.object({}).passthrough().default({}),
	components: z.array(z.unknown()).default([]),
	frame_width: z.number().default(0),
	frame_height: z.number().default(0),
	interlace_mode: z.string().optional(),
	colorspace: z.string().optional(),
	transfer_characteristic: z.string().optional(),
})

export default _nmosResourceBase
	.and(_flowBase)
	.and(
		z.discriminatedUnion('format', [
			_flowVideoCore,
			_flowAudioCore,
			_flowDataCore,
			_flowDataEventCore, // is-07
			_flowMuxCore,
		]),
	)
	.and(
		z.union([
			z.discriminatedUnion('media_type', [
				// data
				_flowDataJSONCore,
				_flowDataSDIAncillaryCore,

				// video
				_flowVideoCodedH264,
				_flowVideoCodedVC2,
				_flowVideoRaw,

				// audio
				_flowAudioRaw,
			]),
			z.object({}).passthrough(),
		]),
	)
	.and(looseFlow)
	.describe('Describes a Flow')
