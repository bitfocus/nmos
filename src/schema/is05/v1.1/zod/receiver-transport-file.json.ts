import { z } from 'zod'

export default z
	.object({
		data: z
			.union([z.string().describe('Content of the transport file'), z.null().describe('Content of the transport file')])
			.describe('Content of the transport file'),
		type: z
			.union([
				z.string().describe('IANA assigned media type for file (e.g application/sdp)'),
				z.null().describe('IANA assigned media type for file (e.g application/sdp)'),
			])
			.describe('IANA assigned media type for file (e.g application/sdp)'),
	})
	.strict()
	.describe(
		"Transport file parameters. 'data' and 'type' must both be strings or both be null. If 'type' is non-null 'data' is expected to contain a valid instance of the specified media type."
	)
