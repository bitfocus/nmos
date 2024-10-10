import { z } from 'zod'

export default z
	.array(z.enum(['senders/', 'receivers/']))
	.min(2)
	.max(2)
	.describe('Describes the Connection API /bulk base resource')
