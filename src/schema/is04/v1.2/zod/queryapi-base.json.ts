import { z } from 'zod'

export default z
	.array(z.enum(['nodes/', 'sources/', 'flows/', 'devices/', 'senders/', 'receivers/', 'subscriptions/']))
	.min(7)
	.max(7)
	.describe('Describes the Query API base resource')
