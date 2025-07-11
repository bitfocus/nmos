import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { _macAdressPrimitive } from './_primitives'

export const _endpoint = z.object({
	host: z.string().describe('IP address or hostname which the Node API is running on'),
	port: z.number().int().gte(1).lte(65535).describe('Port number which the Node API is running on'),
	protocol: z.enum(['http', 'https']).describe('Protocol supported by this instance of the Node API'),
	authorization: z.boolean().describe('This endpoint requires authorization').default(false),
})

export const _endpoints = z.array(_endpoint)

export const _nodeServices = z.array(
	z.object({
		href: z.string().url().describe('URL to reach a service running on the Node'),
		type: z.string().url().describe('URN identifying the type of service'),
		authorization: z.boolean().describe('This endpoint requires authorization').default(false),
	}),
)

const _nodeClockNoExtRef = z.object({
	name: z.string().regex(new RegExp('^clk[0-9]+$')).describe('Name of this refclock (unique for this set of clocks)'),
	ref_type: z.literal('internal').describe('Type of external reference used by this clock'),
})

const _nodeClockPTPRef = z.object({
	name: z.string().regex(new RegExp('^clk[0-9]+$')).describe('Name of this refclock (unique for this set of clocks)'),
	ref_type: z.literal('ptp').describe('Type of external reference used by this clock'),
	traceable: z.boolean().describe('External refclock is synchronised to International Atomic Time (TAI)'),
	version: z.literal('IEEE1588-2008').describe('Version of PTP reference used by this clock'),
	gmid: z
		.string()
		.regex(
			new RegExp(
				'^[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}$',
			),
		)
		.describe('ID of the PTP reference used by this clock'),
	locked: z
		.boolean()
		.describe(
			'Lock state of this clock to the external reference. If true, this device follows the external reference, otherwise it has no defined relationship to the external reference',
		),
})

export const _nodeChassisId = z.union([
	_macAdressPrimitive.describe('When the Chassis ID is a MAC address, use this format'),
	z
		.string()
		.regex(new RegExp('^.+$'))
		.describe('When the Chassis ID is anything other than a MAC address, a freeform string may be used'),
	z.null().describe('When the Chassis ID is unavailable it should be set to null'),
])

export const _nodeInterfaces = z.array(
	z.object({
		chassis_id: _nodeChassisId.describe(
			'Chassis ID of the interface, as signalled in LLDP from this node. Set to null where LLDP is unsuitable for use (ie. virtualised environments)',
		),
		port_id: _macAdressPrimitive.describe(
			'Port ID of the interface, as signalled in LLDP or via ARP responses from this node. Must be a MAC address',
		),
		name: z
			.string()
			.describe(
				'Name of the interface (unique in scope of this node).  This attribute is used by sub-resources of this node such as senders and receivers to refer to interfaces to which they are bound.',
			),
		attached_network_device: z
			.object({
				chassis_id: _nodeChassisId.describe(
					'Chassis ID of the attached network device, as signalled in LLDP received by this Node.',
				),
				port_id: z
					.union([
						_macAdressPrimitive,
						z
							.string()
							.regex(new RegExp('^.+$'))
							.describe(
								'When the Port ID is anything other than a MAC address, a freeform string may be used',
							),
					])
					.describe('Port ID of the attached network device, as signalled in LLDP received by this Node.'),
			})
			.optional(),
	}),
)

export const nodeApiVersion = z.union([z.literal('v1.0'), z.literal('v1.1'), z.literal('v1.2'), z.literal('v1.3')])

const _node = _nmosResourceBase
	.and(
		z.object({
			href: z.string().url().describe("HTTP access href for the Node's API (deprecated)"),
			hostname: z.string().describe('Node hostname (optional, deprecated)').optional(),
			api: z
				.object({
					versions: z.array(nodeApiVersion).describe('Supported API versions running on this Node'),
					endpoints: _endpoints.describe('Host, port and protocol details required to connect to the API'),
				})
				.describe('URL fragments required to connect to the Node API'),
			caps: z.record(z.any()).describe('Capabilities (not yet defined)'),
			services: _nodeServices.describe('Array of objects containing a URN format type and href'),
			clocks: z
				.array(
					z.union([
						_nodeClockNoExtRef.describe('Describes a clock with no external reference'),
						_nodeClockPTPRef.describe('Describes a clock referenced to PTP'),
					]),
				)
				.describe('Clocks made available to Devices owned by this Node'),
			interfaces: _nodeInterfaces.describe(
				'Network interfaces made available to devices owned by this Node. Port IDs and Chassis IDs are used to inform topology discovery via IS-06, and require that interfaces implement ARP at a minimum, and ideally LLDP.',
			),
		}),
	)
	.describe('Describes the Node and the services which run on it')

export type NodeBaseView = z.infer<typeof _node>

export default _node
