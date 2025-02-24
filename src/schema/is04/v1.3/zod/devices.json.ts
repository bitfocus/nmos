import { unknown, z } from 'zod'
import { idPrimitive } from './_primitives'
import { tags } from './_propTags'
import { _nmosResourceBase } from './_nnosResourceBase'

export default z
	.array(_nmosResourceBase.and(
		z.object({
			type: z.string()
				.describe('Device type URN'),
			node_id: idPrimitive
				.describe(
					'Globally unique identifier for the Node which initially created the Device. This attribute is used to ensure referential integrity by registry implementations.'
				),
			senders: z
				.array(
					idPrimitive
				)
				.describe('UUIDs of Senders attached to the Device (deprecated)'),
			receivers: z
				.array(
					idPrimitive
				)
				.describe('UUIDs of Receivers attached to the Device (deprecated)'),
			controls: z
				.array(
					z.object({
						href: z
							.string()
							.url()
							.describe('URL to reach a control endpoint, whether http or otherwise'),
						type: z.string().url().describe('URN identifying the control format'),
						authorization: z
							.boolean()
							.describe('This endpoint requires authorization')
							.default(false),
					})
				)
				.describe('Control endpoints exposed for the Device'),
			}))
			.describe('Describes a Device')
	)
	.describe('A list of Device resources')
