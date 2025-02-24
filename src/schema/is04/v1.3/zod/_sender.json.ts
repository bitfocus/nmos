import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { idPrimitive } from './_primitives'

const transportUrn = z.string().describe('Transport type used by the Sender in URN format')
const manifestHref = z.string().url().describe('HTTP(S) accessible URL to a file describing how to connect to the Sender. Set to null when the transport type used by the Sender does not require a transport file.')

export default _nmosResourceBase.and(
	z.object({
		caps: z.object({}).describe('Capabilities of this sender').optional(),
		flow_id: idPrimitive.nullable().default(null).describe('ID of the Flow currently passing via this Sender. Set to null when a Flow is not currently internally routed to the Sender.'),
		transport: transportUrn
			.describe('Transport type used by the Sender in URN format'),
		device_id: idPrimitive
			.describe(
				'Device ID which this Sender forms part of. This attribute is used to ensure referential integrity by registry implementations.'
			),
		manifest_href: manifestHref.nullable().default(null).describe(
			'HTTP(S) accessible URL to a file describing how to connect to the Sender. Set to null when the transport type used by the Sender does not require a transport file.'
		),
		interface_bindings: z
			.array(z.string())
			.describe('Binding of Sender egress ports to interfaces on the parent Node.'),
		subscription: z
			.object({
				receiver_id: idPrimitive.nullable().default(null).describe(
					'UUID of the Receiver to which this Sender is currently configured to send data. Only set if it is active, uses a unicast push-based transport and is sending to an NMOS Receiver; otherwise null.'
				),
				active: z.boolean().describe('Sender is enabled and configured to send data').default(false),
			}).describe('Object indicating how this Sender is currently configured to send data.')
	}))
	.describe('Describes a sender')
