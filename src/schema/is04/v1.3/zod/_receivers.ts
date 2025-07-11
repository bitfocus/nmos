import { z } from 'zod'
import _nmosReceiver from './_receiver'

export default z.array(_nmosReceiver).describe('A list of Receiver resources')
