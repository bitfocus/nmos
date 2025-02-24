import { z } from 'zod'
import { _portPrimitive, idPrimitive } from '../../../is04/v1.3/zod/_primitives'

export default z
	.object({
		sender_id: idPrimitive.nullable().optional()
			.describe(
				'ID of the Sender subscribed to by this Receiver. This will be null if the receiver has not been configured to receive anything, or if it is receiving from a non-NMOS sender.'
			),
		master_enable: z.boolean().describe('Master on/off control for receiver').optional(),
		activation:
			z.discriminatedUnion('mode', [
				z.object({
					mode: z.null()
				}),
				z.object({
					mode: z.literal('activate_immediate'),
				}),
				z.object({
					mode: z.literal('activate_scheduled_absolute'),
					requested_time: z.string().regex(new RegExp('^[0-9]+:[0-9]+$')),
				}),
				z.object({
					mode: z.literal('activate_scheduled_relative'),
					requested_time: z.string().regex(new RegExp('^[0-9]+:[0-9]+$')),
				}),
			]).optional(),	
		transport_file: z.union([
			z.object({
				data: z.string().describe('Content of the transport file'),
				type: z.string().describe('IANA assigned media type for file (e.g application/sdp)'),
			}),
			z.object({
				data: z.null(),
				type: z.null(),
			}),
		]).optional().describe(
				"Transport file parameters. 'data' and 'type' must both be strings or both be null. If 'type' is non-null 'data' is expected to contain a valid instance of the specified media type."
			),
		transport_params: z
			.union([
				z.array(
					z
						.object({
							source_ip: z.string().nullable()
								.describe(
									'Source IP address of RTP packets in unicast mode, source filter for source specific multicast. A null value indicates that the source IP address has not been configured in unicast mode, or the Receiver is in any-source multicast mode.'
								)
								.optional(),
							multicast_ip: z.string().nullable()
								.describe(
									'IP multicast group address used in multicast operation only. Should be set to null during unicast operation. A null value indicates the parameter has not been configured, or the receiver is operating in unicast mode.'
								)
								.optional(),
							interface_ip: z.string().nullable()
								.describe(
									'IP address of the network interface the receiver should use. The receiver should provide an enum in the constraints endpoint, which should contain the available interface addresses. If set to auto in multicast mode the receiver should determine which interface to use for itself, for example by using the routing tables. The behaviour of auto is undefined in unicast mode, and controllers should supply a specific interface address.'
								)
								.optional(),
							destination_port: z
								.union([
									_portPrimitive
										.describe('destination port for RTP packets (auto = 5004 by default)'),
									z.literal('auto')
										.describe('destination port for RTP packets (auto = 5004 by default)'),
								])
								.describe('destination port for RTP packets (auto = 5004 by default)')
								.optional(),
							fec_enabled: z.boolean().describe('FEC on/off').optional(),
							fec_destination_ip: z.union([z.string(), z.literal('auto')])
								.optional().describe(
									'May be used if NAT is being used at the destination (auto = multicast_ip (multicast mode) or interface_ip (unicast mode) by default)'
								),
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
									_portPrimitive
										.describe('destination port for RTCP packets (auto = RTP destination_port + 1 by default)'),
									z.literal('auto')
										.describe('destination port for RTCP packets (auto = RTP destination_port + 1 by default)'),
								])
								.describe('destination port for RTCP packets (auto = RTP destination_port + 1 by default)')
								.optional(),
							rtp_enabled: z.boolean().describe('RTP reception active/inactive').optional(),
						})
				),
				z.array(
					z
						.object({
							connection_uri: z
								.string()
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
				),
				z.array(
					z
						.object({
							source_host: z
								.string()
								.describe(
									'Hostname or IP hosting the MQTT broker. If the parameter is set to auto the Receiver should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration. A null value indicates that the Receiver has not yet been configured.'
								)
								.optional(),
							source_port: z
								.union([
									_portPrimitive
										.describe(
											'Source port for MQTT traffic. If the parameter is set to auto the Receiver should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
										),
									z.literal('auto')
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
								.string().nullable()
								.describe(
									'The topic which MQTT messages will be received from via the MQTT broker. A null value indicates that the Receiver has not yet been configured.'
								)
								.optional(),
							connection_status_broker_topic: z
								.string().nullable()
								.describe(
									'The topic used for MQTT status messages such as MQTT Last Will which are received via the MQTT broker. A null value indicates that the Receiver has not yet been configured, or is not using a connection status topic.'
								)
								.optional(),
						}).describe(
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
