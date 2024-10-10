import { z } from 'zod'

export default z
	.any()
	.refine((value) => !z.any().safeParse(value).success, 'Invalid input: Should NOT be valid against schema')
