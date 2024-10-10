import { z } from 'zod'

export default z
	.object({
		source_ip: z
			.union([z.any(), z.any(), z.any()])
			.describe(
				'IP address from which RTP packets will be sent (IP address of interface bound to this output). The sender should provide an enum in the constraints endpoint, which should contain the available interface addresses. If the parameter is set to auto the sender should establish for itself which interface it should use, based on routing rules or its own internal configuration.'
			)
			.optional(),
		destination_ip: z
			.union([z.any(), z.any(), z.any()])
			.describe(
				'IP address to which RTP packets will be sent. If auto is set the sender should select a multicast address to send to itself. For example it may implement MADCAP (RFC 2730), ZMAAP, or be allocated address by some other system responsible for co-ordination multicast address use.'
			)
			.optional(),
		source_port: z
			.union([
				z.number().int().gte(0).lte(65535).describe('source port for RTP packets (auto = 5004 by default)'),
				z.string().regex(new RegExp('^auto$')).describe('source port for RTP packets (auto = 5004 by default)'),
			])
			.describe('source port for RTP packets (auto = 5004 by default)')
			.optional(),
		destination_port: z
			.union([
				z.number().int().gte(1).lte(65535).describe('destination port for RTP packets (auto = 5004 by default)'),
				z.string().regex(new RegExp('^auto$')).describe('destination port for RTP packets (auto = 5004 by default)'),
			])
			.describe('destination port for RTP packets (auto = 5004 by default)')
			.optional(),
		fec_enabled: z.boolean().describe('FEC on/off').optional(),
		fec_destination_ip: z
			.union([z.any(), z.any(), z.any()])
			.describe('May be used if NAT is being used at the destination (auto = destination_ip by default)')
			.optional(),
		fec_type: z.enum(['XOR', 'Reed-Solomon']).describe('forward error correction mode to apply').optional(),
		fec_mode: z.enum(['1D', '2D']).describe('forward error correction mode to apply').optional(),
		fec_block_width: z
			.number()
			.int()
			.gte(4)
			.lte(200)
			.describe('width of block over which FEC is calculated in packets')
			.optional(),
		fec_block_height: z
			.number()
			.int()
			.gte(4)
			.lte(200)
			.describe('height of block over which FEC is calculated in packets')
			.optional(),
		fec1D_destination_port: z
			.union([
				z
					.number()
					.int()
					.gte(1)
					.lte(65535)
					.describe('destination port for RTP Column FEC packets (auto = RTP destination_port + 2 by default)'),
				z
					.string()
					.regex(new RegExp('^auto$'))
					.describe('destination port for RTP Column FEC packets (auto = RTP destination_port + 2 by default)'),
			])
			.describe('destination port for RTP Column FEC packets (auto = RTP destination_port + 2 by default)')
			.optional(),
		fec2D_destination_port: z
			.union([
				z
					.number()
					.int()
					.gte(1)
					.lte(65535)
					.describe('destination port for RTP Row FEC packets (auto = RTP destination_port + 4 by default)'),
				z
					.string()
					.regex(new RegExp('^auto$'))
					.describe('destination port for RTP Row FEC packets (auto = RTP destination_port + 4 by default)'),
			])
			.describe('destination port for RTP Row FEC packets (auto = RTP destination_port + 4 by default)')
			.optional(),
		fec1D_source_port: z
			.union([
				z
					.number()
					.int()
					.gte(0)
					.lte(65535)
					.describe('source port for RTP FEC packets (auto = RTP source_port + 2 by default)'),
				z
					.string()
					.regex(new RegExp('^auto$'))
					.describe('source port for RTP FEC packets (auto = RTP source_port + 2 by default)'),
			])
			.describe('source port for RTP FEC packets (auto = RTP source_port + 2 by default)')
			.optional(),
		fec2D_source_port: z
			.union([
				z
					.number()
					.int()
					.gte(0)
					.lte(65535)
					.describe('source port for RTP FEC packets (auto = RTP source_port + 4 by default)'),
				z
					.string()
					.regex(new RegExp('^auto$'))
					.describe('source port for RTP FEC packets (auto = RTP source_port + 4 by default)'),
			])
			.describe('source port for RTP FEC packets (auto = RTP source_port + 4 by default)')
			.optional(),
		rtcp_enabled: z.boolean().describe('rtcp on/off').optional(),
		rtcp_destination_ip: z
			.union([z.any(), z.any(), z.any()])
			.describe('IP address to which RTCP packets will be sent (auto = same as RTP destination_ip by default)')
			.optional(),
		rtcp_destination_port: z
			.union([
				z
					.number()
					.int()
					.gte(1)
					.lte(65535)
					.describe('destination port for RTCP packets (auto = RTP destination_port + 1 by default)'),
				z
					.string()
					.regex(new RegExp('^auto$'))
					.describe('destination port for RTCP packets (auto = RTP destination_port + 1 by default)'),
			])
			.describe('destination port for RTCP packets (auto = RTP destination_port + 1 by default)')
			.optional(),
		rtcp_source_port: z
			.union([
				z
					.number()
					.int()
					.gte(0)
					.lte(65535)
					.describe('source port for RTCP packets (auto = RTP source_port + 1 by default)'),
				z
					.string()
					.regex(new RegExp('^auto$'))
					.describe('source port for RTCP packets (auto = RTP source_port + 1 by default)'),
			])
			.describe('source port for RTCP packets (auto = RTP source_port + 1 by default)')
			.optional(),
		rtp_enabled: z.boolean().describe('RTP transmission active/inactive').optional(),
	})
	.catchall(
		z.union([
			z
				.union([
					z
						.string()
						.describe(
							'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
					z
						.boolean()
						.describe(
							'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
					z
						.null()
						.describe(
							'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
					z
						.number()
						.describe(
							'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
				])
				.describe(
					'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
				),
			z.never(),
		])
	)
	.superRefine((value, ctx) => {
		for (const key in value) {
			let evaluated = [
				'source_ip',
				'destination_ip',
				'source_port',
				'destination_port',
				'fec_enabled',
				'fec_destination_ip',
				'fec_type',
				'fec_mode',
				'fec_block_width',
				'fec_block_height',
				'fec1D_destination_port',
				'fec2D_destination_port',
				'fec1D_source_port',
				'fec2D_source_port',
				'rtcp_enabled',
				'rtcp_destination_ip',
				'rtcp_destination_port',
				'rtcp_source_port',
				'rtp_enabled',
			].includes(key)
			if (key.match(new RegExp('^ext_[a-zA-Z0-9_]+$'))) {
				evaluated = true
				const result = z
					.union([
						z
							.string()
							.describe(
								'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
						z
							.boolean()
							.describe(
								'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
						z
							.null()
							.describe(
								'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
						z
							.number()
							.describe(
								'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
					])
					.describe(
						'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
					)
					.safeParse(value[key])
				if (!result.success) {
					ctx.addIssue({
						path: [...ctx.path, key],
						code: 'custom',
						message: `Invalid input: Key matching regex /${key}/ must match schema`,
						params: {
							issues: result.error.issues,
						},
					})
				}
			}
			if (!evaluated) {
				const result = z.never().safeParse(value[key])
				if (!result.success) {
					ctx.addIssue({
						path: [...ctx.path, key],
						code: 'custom',
						message: `Invalid input: must match catchall schema`,
						params: {
							issues: result.error.issues,
						},
					})
				}
			}
		}
	})
	.describe(
		'Describes RTP Sender transport parameters. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint. As a minimum all senders must support `source_ip`, `destination_ip`, `source_port`, `rtp_enabled` and `destination_port`. Senders supporting FEC and/or RTCP must support parameters prefixed with `fec` and `rtcp` respectively.'
	)
