import { z } from 'zod'
import { _audioChannels } from './_primitives'
import { _nmosResourceBase } from './_nnosResourceBase'
import { _sourceBase } from './_sourceBase'
import _source from './_source'

export default z
	.array(
		_source
	)
	.describe('A list of Source resources')