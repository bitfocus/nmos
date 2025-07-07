import { z } from 'zod'
import _flow from './_flow'

export default z.array(_flow.describe('Describes a Flow')).describe('A list of Flow resources')
