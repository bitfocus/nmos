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
import { _flowDataGenericCore } from './_flowDataGenericCore'
import { _flowAudioCoded } from './_flowAudioCoded'
import { _flowDataCore } from './_flowDataCore'
import { _flowDataEventCore } from './_flowDataEventCore'

const _flowVideoFuture = z.object({
	media_type: z.string().startsWith('video/'),
	components: z
		.array(
			_flowVideoRawComponent
		)
		.min(1)
		.describe('Array of objects describing the components'),
})

const _flowAudioFuture = z.object({
	media_type: z.string().startsWith('audio/')
})



export default
	_nmosResourceBase
	.and(_flowBase)
	.and(z.discriminatedUnion('format', [
		_flowVideoCore,
		_flowAudioCore,
		_flowDataCore,
		_flowDataEventCore, // is-07
		_flowMuxCore,
	]))
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
			z.any()
		])
	)
	.describe('Describes a Flow')
