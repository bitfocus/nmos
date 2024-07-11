import { z } from 'zod'

export default z.array(z.enum(['resource/', 'health/'])).describe('Describes the Registration API base resource')
