import { z } from 'zod'
import { idPrimitive, versionPrimitive } from './_primitives'
import { _nmosResourceBase } from './_nnosResourceBase'

import _sender from './_sender'

export default z
	.array(
		_sender
	)
	.describe('A list of Sender resources')
