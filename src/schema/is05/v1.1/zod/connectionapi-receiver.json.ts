import { z } from 'zod'

export default z
	.array(z.enum(['constraints/', 'staged/', 'active/', 'transporttype/']))
	.min(4)
	.max(4)
	.describe('Describes the Connection API /single/receivers/{receiverId} base resource')
