import { z } from 'zod'

export default z
	.array(z.enum(['nodes/', 'sources/', 'flows/', 'devices/', 'senders/', 'receivers/', 'subscriptions/']))
	.describe('Describes the Query API base resource')
