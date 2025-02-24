import { z } from 'zod'
import { idPrimitive } from '../../../is04/v1.3/zod/_primitives'

export default z
	.object({
		sender_id: z
			.union([
				idPrimitive
					.describe(
						'ID of the Sender subscribed to by this Receiver. This will be null if the receiver has not been configured to receive anything, or if it is receiving from a non-NMOS sender.'
					),
				z
					.null()
					.describe(
						'ID of the Sender subscribed to by this Receiver. This will be null if the receiver has not been configured to receive anything, or if it is receiving from a non-NMOS sender.'
					),
			])
			.describe(
				'ID of the Sender subscribed to by this Receiver. This will be null if the receiver has not been configured to receive anything, or if it is receiving from a non-NMOS sender.'
			)
			.optional(),
		master_enable: z.boolean().describe('Master on/off control for receiver').optional(),
		activation: z
			.object({
				mode: z
					.union([
						z.enum(['activate_immediate', 'activate_scheduled_absolute', 'activate_scheduled_relative']),
						z.null(),
					])
					.describe(
						'Mode of activation: immediate (on message receipt), scheduled_absolute (when internal clock >= requested_time), scheduled_relative (when internal clock >= time of message receipt + requested_time), or null (no activation scheduled)'
					),
				requested_time: z
					.union([z.string().regex(new RegExp('^[0-9]+:[0-9]+$')), z.null()])
					.describe(
						"String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating time (absolute or relative) for activation. Should be null or not present if 'mode' is null."
					)
					.optional(),
			})
			.strict()
			.describe('Parameters concerned with activation of the transport parameters')
			.optional(),
		transport_file: z
			.object({
				data: z
					.union([
						z.string().describe('Content of the transport file'),
						z.null().describe('Content of the transport file'),
					])
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
			.optional(),
		transport_params: z
			.union([
				z.array(
					z
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
								.describe(
									'May be used if NAT is being used at the destination (auto = multicast_ip (multicast mode) or interface_ip (unicast mode) by default)'
								)
								.optional(),
							fec_mode: z
								.enum(['auto', '1D', '2D'])
								.describe(
									'forward error correction mode to apply. (auto = highest available number of dimensions by default)'
								)
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
								.union([z.any(), z.null()])
								.describe(
									'URI hosting the WebSocket server as defined in RFC 6455 Section 3. A null value indicates that the receiver has not yet been configured.'
								)
								.optional(),
							connection_authorization: z
								.union([z.literal('auto'), z.literal(true), z.literal(false)])
								.describe(
									'Indication of whether authorization is required to make a connection. If the parameter is set to auto the Receiver should establish for itself whether authorization should be used, based on its own internal configuration.'
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
								let evaluated = ['connection_uri', 'connection_authorization'].includes(key)
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
							'Describes WebSocket Receiver transport parameters. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint. WebSocket Receivers must support all parameters in this schema.'
						)
				),
				z.array(
					z
						.object({
							source_host: z
								.union([z.any(), z.any(), z.any(), z.any(), z.null()])
								.describe(
									'Hostname or IP hosting the MQTT broker. If the parameter is set to auto the Receiver should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration. A null value indicates that the Receiver has not yet been configured.'
								)
								.optional(),
							source_port: z
								.union([
									z
										.number()
										.int()
										.gte(1)
										.lte(65535)
										.describe(
											'Source port for MQTT traffic. If the parameter is set to auto the Receiver should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
										),
									z
										.string()
										.regex(new RegExp('^auto$'))
										.describe(
											'Source port for MQTT traffic. If the parameter is set to auto the Receiver should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
										),
								])
								.describe(
									'Source port for MQTT traffic. If the parameter is set to auto the Receiver should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
								)
								.optional(),
							broker_protocol: z
								.enum(['auto', 'mqtt', 'secure-mqtt'])
								.describe(
									"Indication of whether TLS is used for communication with the broker. 'mqtt' indicates operation without TLS, and 'secure-mqtt' indicates use of TLS. If the parameter is set to auto the Receiver should establish for itself which protocol it should use, based on a discovery mechanism or its own internal configuration."
								)
								.optional(),
							broker_authorization: z
								.union([z.literal('auto'), z.literal(true), z.literal(false)])
								.describe(
									'Indication of whether authorization is used for communication with the broker. If the parameter is set to auto the Receiver should establish for itself whether authorization should be used, based on a discovery mechanism or its own internal configuration.'
								)
								.optional(),
							broker_topic: z
								.union([
									z
										.string()
										.describe(
											'The topic which MQTT messages will be received from via the MQTT broker. A null value indicates that the Receiver has not yet been configured.'
										),
									z
										.null()
										.describe(
											'The topic which MQTT messages will be received from via the MQTT broker. A null value indicates that the Receiver has not yet been configured.'
										),
								])
								.describe(
									'The topic which MQTT messages will be received from via the MQTT broker. A null value indicates that the Receiver has not yet been configured.'
								)
								.optional(),
							connection_status_broker_topic: z
								.union([
									z
										.string()
										.describe(
											'The topic used for MQTT status messages such as MQTT Last Will which are received via the MQTT broker. A null value indicates that the Receiver has not yet been configured, or is not using a connection status topic.'
										),
									z
										.null()
										.describe(
											'The topic used for MQTT status messages such as MQTT Last Will which are received via the MQTT broker. A null value indicates that the Receiver has not yet been configured, or is not using a connection status topic.'
										),
								])
								.describe(
									'The topic used for MQTT status messages such as MQTT Last Will which are received via the MQTT broker. A null value indicates that the Receiver has not yet been configured, or is not using a connection status topic.'
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
									'source_host',
									'source_port',
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
							'Describes MQTT Receiver transport parameters. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint. MQTT Receivers must support all parameters in this schema.'
						)
				),
			])
			.describe(
				"Transport-specific parameters. If this parameter is included in a client request it must include the same number of array elements (or 'legs') as specified in the constraints. If no changes are required to a specific leg it must be included as an empty object ({})."
			)
			.optional(),
	})
	.strict()
	.describe('Describes a receiver')
