import { z } from 'zod'

export default z
	.object({
		destination_host: z
			.union([z.any(), z.any(), z.any(), z.any(), z.null()])
			.describe(
				'Hostname or IP hosting the MQTT broker. If the parameter is set to auto the Sender should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration. A null value indicates that the Sender has not yet been configured.'
			)
			.optional(),
		destination_port: z
			.union([
				z
					.number()
					.int()
					.gte(1)
					.lte(65535)
					.describe(
						'Destination port for MQTT traffic. If the parameter is set to auto the Sender should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
					),
				z
					.string()
					.regex(new RegExp('^auto$'))
					.describe(
						'Destination port for MQTT traffic. If the parameter is set to auto the Sender should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
					),
			])
			.describe(
				'Destination port for MQTT traffic. If the parameter is set to auto the Sender should establish for itself which broker it should use, based on a discovery mechanism or its own internal configuration.'
			)
			.optional(),
		broker_protocol: z
			.enum(['auto', 'mqtt', 'secure-mqtt'])
			.describe(
				"Indication of whether TLS is used for communication with the broker. 'mqtt' indicates operation without TLS, and 'secure-mqtt' indicates use of TLS. If the parameter is set to auto the Sender should establish for itself which protocol it should use, based on a discovery mechanism or its own internal configuration."
			)
			.optional(),
		broker_authorization: z
			.union([z.literal('auto'), z.literal(true), z.literal(false)])
			.describe(
				'Indication of whether authorization is used for communication with the broker. If the parameter is set to auto the Sender should establish for itself whether authorization should be used, based on a discovery mechanism or its own internal configuration.'
			)
			.optional(),
		broker_topic: z
			.union([
				z
					.string()
					.describe(
						'The topic which MQTT messages will be sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured.'
					),
				z
					.null()
					.describe(
						'The topic which MQTT messages will be sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured.'
					),
			])
			.describe(
				'The topic which MQTT messages will be sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured.'
			)
			.optional(),
		connection_status_broker_topic: z
			.union([
				z
					.string()
					.describe(
						'The topic which MQTT status messages such as MQTT Last Will are sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured, or is not using a connection status topic.'
					),
				z
					.null()
					.describe(
						'The topic which MQTT status messages such as MQTT Last Will are sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured, or is not using a connection status topic.'
					),
			])
			.describe(
				'The topic which MQTT status messages such as MQTT Last Will are sent to on the MQTT broker. A null value indicates that the Sender has not yet been configured, or is not using a connection status topic.'
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
							'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
					z
						.boolean()
						.describe(
							'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
					z
						.null()
						.describe(
							'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
					z
						.number()
						.describe(
							'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
						),
				])
				.describe(
					'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
				),
			z.never(),
		])
	)
	.superRefine((value, ctx) => {
		for (const key in value) {
			let evaluated = [
				'destination_host',
				'destination_port',
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
								'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
						z
							.boolean()
							.describe(
								'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
						z
							.null()
							.describe(
								'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
						z
							.number()
							.describe(
								'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
							),
					])
					.describe(
						'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
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
		'Describes MQTT Sender transport parameters. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint. MQTT Senders must support all properties in this schema.'
	)
