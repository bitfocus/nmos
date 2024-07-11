import { z } from 'zod'

export default z
	.array(z.enum(['self/', 'sources/', 'flows/', 'devices/', 'senders/', 'receivers/']))
	.describe('Describes the Node API base resource')
