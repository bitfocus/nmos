import { z } from 'zod'

export default z
	.array(z.enum(['resource/', 'health/']))
	.min(2)
	.max(2)
	.describe('Describes the Registration API base resource')
