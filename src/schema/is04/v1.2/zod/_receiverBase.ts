
import { z } from 'zod';
import { idPrimitive } from './_primitives';
import { _receiverSubscription } from './_receiverSubscription';

export const _receiverBase = z.object({
	device_id: idPrimitive
		.describe(
			'Device ID which this Receiver forms part of. This attribute is used to ensure referential integrity by registry implementations.'
		),
	transport: z.string()
		.describe(
			'Transport type accepted by the Receiver in URN format'
		),
	interface_bindings: z
		.array(z.string())
		.describe(
			'Binding of Receiver ingress ports to interfaces on the parent Node.'
		),
	subscription: _receiverSubscription
		.describe(
			'Object indicating how this Receiver is currently configured to receive data.'
		),
});
