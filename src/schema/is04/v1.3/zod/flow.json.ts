import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { _flowBase } from './_flowBase'
import { _flowVideoCore } from './_flowVideoCore'
import { _flowAudioCore } from './_flowAudioCore'
import { _flowVideoRaw } from './_flowVideoRaw'
import { _flowVideoCodedH264, _flowVideoCodedVC2 } from './_flowVideoCoded'
import { _flowAudioRaw } from './_flowAudioRaw'
import { _flowMuxCore } from './_flowMuxCore'
import { _flowDataJSONCore } from './_flowDataJSONCore'
import { _flowDataSDIAncillaryCore } from './_flowDataSDIAncilleryCore'
import { _flowDataGenericCore } from './_flowDataGenericCore'
import { _flowAudioCoded } from './_flowAudioCoded'
import { _flowDataCore } from './_flowDataCore'


export default
	_nmosResourceBase
	.and(_flowBase)
	.and(z.discriminatedUnion('format', [
		_flowVideoCore,
		_flowAudioCore,
		_flowDataCore,
		_flowMuxCore,
	]))
	.and(z.discriminatedUnion('media_type', [
		// data
		_flowDataGenericCore,
		_flowDataJSONCore,
		_flowDataSDIAncillaryCore,

		// video
		_flowVideoCodedH264,
		_flowVideoCodedVC2,
		_flowVideoRaw,

		// audio
		_flowAudioRaw,
		_flowAudioCoded,
	]))
		.describe('Describes a Flow')
