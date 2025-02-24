import { z } from 'zod';
import { idPrimitive } from './_primitives';

export const _receiverSubscription = z
	.object({
		sender_id: idPrimitive.nullable().default(null)
			.describe(
				'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
			),
		active: z
			.boolean()
			.describe(
				'Receiver is enabled and configured to receive data'
			)
			.default(false),
	});
