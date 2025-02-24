import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { _receiverMuxCore } from './_receiverMuxCore'
import { _receiverBase } from './_receiverBase'
import { _receiverVideoCore } from './_receiverVideoCore'
import { _receiverAudioCore } from './_receiverAudioCore'
import { _receiverDataCore } from './_receiverDataCore'
import _nmosReceiver from './_receiver.json'

export default z
	.array(
		_nmosReceiver
	)
	.describe('A list of Receiver resources')
