import { z } from 'zod'
import { _nmosResourceBase } from './_nnosResourceBase'
import { idPrimitive } from './_primitives'
import { URNControlSchema } from './_urns'
import { _deviceControlsItemWithAuth } from '../../v1.3/zod/_controls'
import { _deviceControlsItem } from './_controls'

export default _nmosResourceBase.and(
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
				_deviceControlsItem
			)
			.describe('Control endpoints exposed for the Device'),
		}))
		.describe('Describes a Device')
