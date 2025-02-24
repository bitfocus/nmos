import { z } from 'zod'
import { idPrimitive } from '../../../is04/v1.3/zod/_primitives'

export default z
	.object({
		receiver_id: idPrimitive.optional(),
		master_enable: z.boolean().describe('Master on/off control for sender').optional(),
		activation: z
			.object({
				mode: z.enum(['activate_immediate', 'activate_scheduled_absolute', 'activate_scheduled_relative']).nullable()
					.describe(
						'Mode of activation: immediate (on message receipt), scheduled_absolute (when internal clock >= requested_time), scheduled_relative (when internal clock >= time of message receipt + requested_time), or null (no activation scheduled)'
					),
				requested_time: z
					.union([z.string().regex(new RegExp('^[0-9]+:[0-9]+$')), z.null()])
					.describe(
						"String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating time (absolute or relative) for activation. Should be null or not present if 'mode' is null."
					)
					.optional(),
			}).optional()
			.describe('Parameters concerned with activation of the transport parameters'),
		transport_params: z
			.union([
				z.array(
					z
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
									z
										.string()
										.regex(new RegExp('^auto$'))
										.describe('source port for RTP packets (auto = 5004 by default)'),
								])
								.describe('source port for RTP packets (auto = 5004 by default)')
								.optional(),
							destination_port: z
								.union([
									z
										.number()
										.int()
										.gte(1)
										.lte(65535)
										.describe('destination port for RTP packets (auto = 5004 by default)'),
									z
										.string()
										.regex(new RegExp('^auto$'))
										.describe('destination port for RTP packets (auto = 5004 by default)'),
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
										.describe(
											'destination port for RTP Column FEC packets (auto = RTP destination_port + 2 by default)'
										),
									z
										.string()
										.regex(new RegExp('^auto$'))
										.describe(
											'destination port for RTP Column FEC packets (auto = RTP destination_port + 2 by default)'
										),
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
								.describe(
									'IP address to which RTCP packets will be sent (auto = same as RTP destination_ip by default)'
								)
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
				),
				z.array(
					z
						.any()
						.refine((value) => !z.any().safeParse(value).success, 'Invalid input: Should NOT be valid against schema')
				),
				z.array(
					z
						.object({
							connection_uri: z
								.union([z.any(), z.any(), z.null()])
								.describe(
									'URI hosting the WebSocket server as defined in RFC 6455 Section 3. The sender should provide an enum in the constraints endpoint, which should contain the available interface addresses formatted as connection URIs. If the parameter is set to auto the sender should establish for itself which interface it should use, based on routing rules or its own internal configuration. A null value indicates that the sender has not yet been configured.'
								)
								.optional(),
							connection_authorization: z
								.union([z.literal('auto'), z.literal(true), z.literal(false)])
								.describe(
									'Indication of whether authorization is required to make a connection. If the parameter is set to auto the Sender should establish for itself whether authorization should be used, based on its own internal configuration.'
								)
								.optional(),
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
								let evaluated = ['connection_uri', 'connection_authorization'].includes(key)
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
							'Describes WebSocket Sender transport parameters. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint. WebSocket Senders must support all parameters in this schema.'
						)
				),
				z.array(
					z
						.object({
							destination_host: z
								.union([z.any(), z.any(), z.any(), z.any(), z.null()])
								.describe(
									'Hostname or IP hosting the MQTT broker. If the parameter is set to auto the Sender should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration. A null value indicates that the Sender has not yet been configured.'
								)
								.optional(),
							destination_port: z
								.union([
									z
										.number()
										.int()
										.gte(1)
										.lte(65535)
										.describe(
											'Destination port for MQTT traffic. If the parameter is set to auto the Sender should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
										),
									z
										.string()
										.regex(new RegExp('^auto$'))
										.describe(
											'Destination port for MQTT traffic. If the parameter is set to auto the Sender should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
										),
								])
								.describe(
									'Destination port for MQTT traffic. If the parameter is set to auto the Sender should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
								)
								.optional(),
							broker_protocol: z
								.enum(['auto', 'mqtt', 'secure-mqtt'])
								.describe(
									"Indication of whether TLS is used for communication with the broker. 'mqtt' indicates operation without TLS, and 'secure-mqtt' indicates use of TLS. If the parameter is set to auto the Sender should establish for itself which protocol it should use, based on a discovery mechanism or its own internal configuration."
								)
								.optional(),
							broker_authorization: z
								.union([z.literal('auto'), z.literal(true), z.literal(false)])
								.describe(
									'Indication of whether authorization is used for communication with the broker. If the parameter is set to auto the Sender should establish for itself whether authorization should be used, based on a discovery mechanism or its own internal configuration.'
								)
								.optional(),
							broker_topic: z
								.union([
									z
										.string()
										.describe(
											'The topic which MQTT messages will be sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured.'
										),
									z
										.null()
										.describe(
											'The topic which MQTT messages will be sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured.'
										),
								])
								.describe(
									'The topic which MQTT messages will be sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured.'
								)
								.optional(),
							connection_status_broker_topic: z
								.union([
									z
										.string()
										.describe(
											'The topic which MQTT status messages such as MQTT Last Will are sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured, or is not using a connection status topic.'
										),
									z
										.null()
										.describe(
											'The topic which MQTT status messages such as MQTT Last Will are sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured, or is not using a connection status topic.'
										),
								])
								.describe(
									'The topic which MQTT status messages such as MQTT Last Will are sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured, or is not using a connection status topic.'
								)
								.optional(),
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
									'destination_host',
									'destination_port',
									'broker_protocol',
									'broker_authorization',
									'broker_topic',
									'connection_status_broker_topic',
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
							'Describes MQTT Sender transport parameters. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint. MQTT Senders must support all properties in this schema.'
						)
				),
			])
			.describe(
				"Transport-specific parameters. If this parameter is included in a client request it must include the same number of array elements (or 'legs') as specified in the constraints. If no changes are required to a specific leg it must be included as an empty object ({})."
			)
			.optional(),
	})
	.strict()
	.describe('Describes a sender')
