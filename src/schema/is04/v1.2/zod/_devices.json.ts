import { unknown, z } from 'zod'
import { idPrimitive } from './_primitives'
import { tags } from './_propTags'
import { _nmosResourceBase } from './_nnosResourceBase'
import _device from './_device.json'

export default z
	.array(
		_device
	)
	.describe('A list of Device resources')
