import { z } from 'zod'

export default z
	.object({
		source_ip: z
			.union([z.any(), z.any(), z.null()])
			.describe(
				'Source IP address of RTP packets in unicast mode, source filter for source specific multicast. A null value indicates that the source IP address has not been configured in unicast mode, or the Receiver is in any-source multicast mode.'
			)
			.optional(),
		multicast_ip: z
			.union([z.any(), z.any(), z.null()])
			.describe(
				'IP multicast group address used in multicast operation only. Should be set to null during unicast operation. A null value indicates the parameter has not been configured, or the receiver is operating in unicast mode.'
			)
			.optional(),
		interface_ip: z
			.union([z.any(), z.any(), z.any()])
			.describe(
				'IP address of the network interface the receiver should use. The receiver should provide an enum in the constraints endpoint, which should contain the available interface addresses. If set to auto in multicast mode the receiver should determine which interface to use for itself, for example by using the routing tables. The behaviour of auto is undefined in unicast mode, and controllers should supply a specific interface address.'
			)
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
			.describe(
				'May be used if NAT is being used at the destination (auto = multicast_ip (multicast mode) or interface_ip (unicast mode) by default)'
			)
			.optional(),
		fec_mode: z
			.enum(['auto', '1D', '2D'])
			.describe('forward error correction mode to apply. (auto = highest available number of dimensions by default)')
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
		rtcp_destination_ip: z
			.union([z.any(), z.any(), z.any()])
			.describe(
				'Destination IP address of RTCP packets (auto = multicast_ip (multicast mode) or interface_ip (unicast mode) by default)'
			)
			.optional(),
		rtcp_enabled: z.boolean().describe('RTCP on/off').optional(),
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
		rtp_enabled: z.boolean().describe('RTP reception active/inactive').optional(),
	})
	.catchall(
		z.union([
			z
				.union([
					z
						.string()
						.describe(
							'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
					z
						.boolean()
						.describe(
							'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
					z
						.null()
						.describe(
							'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
					z
						.number()
						.describe(
							'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
				])
				.describe(
					'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
				),
			z.never(),
		])
	)
	.superRefine((value, ctx) => {
		for (const key in value) {
			let evaluated = [
				'source_ip',
				'multicast_ip',
				'interface_ip',
				'destination_port',
				'fec_enabled',
				'fec_destination_ip',
				'fec_mode',
				'fec1D_destination_port',
				'fec2D_destination_port',
				'rtcp_destination_ip',
				'rtcp_enabled',
				'rtcp_destination_port',
				'rtp_enabled',
			].includes(key)
			if (key.match(new RegExp('^ext_[a-zA-Z0-9_]+$'))) {
				evaluated = true
				const result = z
					.union([
						z
							.string()
							.describe(
								'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
						z
							.boolean()
							.describe(
								'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
						z
							.null()
							.describe(
								'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
						z
							.number()
							.describe(
								'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
					])
					.describe(
						'Describes external Receiver transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
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
		'Describes RTP Receiver transport parameters. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint. Receivers must support at least the `source_ip`, `interface_ip`, `rtp_enabled` and `destination_port` parameters, and must support the `multicast_ip` parameter if they are capable of multicast operation. Receivers supporting FEC and/or RTCP must support parameters prefixed with `fec` and `rtcp` respectively.'
	)
