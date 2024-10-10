import { z } from 'zod'

export default z
	.array(z.string().regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/$')))
	.describe('Describes the Connection API sender/receiver base resource')
