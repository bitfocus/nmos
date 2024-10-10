import { z } from 'zod'

export default z
	.enum([
		'urn:x-nmos:transport:rtp',
		'urn:x-nmos:transport:dash',
		'urn:x-nmos:transport:websocket',
		'urn:x-nmos:transport:mqtt',
	])
	.describe(
		'Transport type URN base used by the Sender or Receiver (i.e. with any subclassifications or versions removed)'
	)
