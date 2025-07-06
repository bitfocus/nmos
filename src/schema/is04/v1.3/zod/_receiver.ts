import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { _receiverAudioCore } from './_receiverAudioCore'
import { _receiverBase } from './_receiverBase'
import { _receiverDataCore } from './_receiverDataCore'
import { _receiverVideoCore } from './_receiverVideoCore'

export default _nmosResourceBase
	.and(_receiverBase)
	.and(z.discriminatedUnion('format', [_receiverAudioCore, _receiverVideoCore, _receiverDataCore]))
	.describe('Describes a Receiver')
