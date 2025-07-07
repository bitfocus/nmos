import { z } from 'zod'
import _source from './_source'

export default z.array(_source).describe('A list of Source resources')
