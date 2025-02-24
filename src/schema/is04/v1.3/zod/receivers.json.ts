import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { _receiverMuxCore } from './_receiverMuxCore'
import { _receiverBase } from './_receiverBase'
import { _receiverVideoCore } from './_receiverVideoCore'
import { _receiverAudioCore } from './_receiverAudioCore'
import { _receiverDataCore } from './_receiverDataCore'

export default z
	.array(
		_nmosResourceBase.and(_receiverBase).and(
			z.discriminatedUnion('format', [
				_receiverAudioCore,
				_receiverVideoCore,
				_receiverDataCore
			])
		)
	)
	.describe('A list of Receiver resources')
