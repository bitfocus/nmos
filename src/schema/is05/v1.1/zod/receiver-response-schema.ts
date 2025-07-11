import { z } from 'zod'
import { idPrimitive } from '../../../is04/v1.3/zod/_primitives'

export default z
	.object({
		sender_id: z
			.union([
				idPrimitive.describe(
					'ID of the Sender subscribed to by this Receiver. This will be null if the receiver has not been configured to receive anything, or if it is receiving from a non-NMOS sender.',
				),
				z
					.null()
					.describe(
						'ID of the Sender subscribed to by this Receiver. This will be null if the receiver has not been configured to receive anything, or if it is receiving from a non-NMOS sender.',
					),
			])
			.describe(
				'ID of the Sender subscribed to by this Receiver. This will be null if the receiver has not been configured to receive anything, or if it is receiving from a non-NMOS sender.',
			),
		master_enable: z.boolean().describe('Master on/off control for receiver'),
		activation: z
			.object({
				mode: z
					.union([
						z.enum(['activate_immediate', 'activate_scheduled_absolute', 'activate_scheduled_relative']),
						z.null(),
					])
					.describe(
						"Mode of activation: immediate (on message receipt), scheduled_absolute (when internal clock >= requested_time), scheduled_relative (when internal clock >= time of message receipt + requested_time), or null (no activation scheduled). This parameter returns to null on the staged endpoint once an activation is completed or when it is explicitly set to null. For immediate activations, in the response to the PATCH request this field will be set to 'activate_immediate', but will be null in response to any subsequent GET requests.",
					),
				requested_time: z
					.union([z.string().regex(new RegExp('^[0-9]+:[0-9]+$')), z.null()])
					.describe(
						'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating time (absolute or relative) for activation requested. This field returns to null once the activation is completed on the staged endpoint or when the resource is unlocked by setting the activation mode to null. For an immediate activation this field will always be null on the staged endpoint, even in the response to the PATCH request.',
					),
				activation_time: z
					.union([z.string().regex(new RegExp('^[0-9]+:[0-9]+$')), z.null()])
					.describe(
						'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating the absolute time the sender or receiver will or did actually activate for scheduled activations, or the time activation occurred for immediate activations. On the staged endpoint this field returns to null once the activation is completed or when the resource is unlocked by setting the activation mode to null. For immediate activations on the staged endpoint this property will be the time the activation actually occurred in the response to the PATCH request, but null in response to any GET requests thereafter.',
					),
			})
			.strict()
			.describe('Parameters concerned with activation of the transport parameters'),
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
				"Transport file parameters. 'data' and 'type' must both be strings or both be null. If 'type' is non-null 'data' is expected to contain a valid instance of the specified media type.",
			),
		transport_params: z
			.unknown()
			.describe(
				"Transport-specific parameters. If this parameter is included in a client request it must include the same number of array elements (or 'legs') as specified in the constraints. If no changes are required to a specific leg it must be included as an empty object ({}).",
			),
	})
	.strict()
	.describe('Describes a receiver')
