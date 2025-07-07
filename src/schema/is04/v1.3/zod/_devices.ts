import { z } from 'zod'
import _device from './_device'

export default z.array(_device).describe('A list of Device resources')
