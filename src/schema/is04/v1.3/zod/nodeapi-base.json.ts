import { z } from 'zod'

export default z
	.array(z.enum(['self/', 'sources/', 'flows/', 'devices/', 'senders/', 'receivers/']))
	.min(6)
	.max(6)
	.describe('Describes the Node API base resource')
