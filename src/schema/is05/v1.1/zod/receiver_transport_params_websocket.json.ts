import { z } from 'zod'

export default z
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
