import { z } from 'zod'

export default z
	.array(z.enum(['constraints/', 'staged/', 'active/', 'transportfile/', 'transporttype/']))
	.min(5)
	.max(5)
	.describe('Describes the Connection API /single/senders/{senderId} base resource')
