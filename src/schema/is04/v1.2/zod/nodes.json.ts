import { z } from 'zod'
import _node from './_node.json'

export default z
	.array(
		_node
	)
	.describe('A list of Node resources')
