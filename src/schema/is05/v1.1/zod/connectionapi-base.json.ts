import { z } from 'zod'

export default z
	.array(z.enum(['bulk/', 'single/']))
	.min(2)
	.max(2)
	.describe('Describes the Connection API base resource')
