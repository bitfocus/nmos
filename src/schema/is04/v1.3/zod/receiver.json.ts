import { z } from 'zod'
import { idPrimitive } from './_primitives'

export default z
	.record(z.any())
	.and(
		z.any().superRefine((x, ctx) => {
			const schemas = [
				z
					.record(z.any())
					.and(
						z.intersection(
							z
								.record(z.any())
								.and(
									z.intersection(
										z
											.object({
												id: idPrimitive
													.describe('Globally unique identifier for the resource'),
												version: z
													.string()
													.regex(new RegExp('^[0-9]+:[0-9]+$'))
													.describe(
														'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
													),
												label: z.string().describe('Freeform string label for the resource'),
												description: z
													.string()
													.describe('Detailed description of the resource'),
												tags: z
													.record(z.array(z.string()))
													.superRefine((value, ctx) => {
														for (const key in value) {
															if (key.match(new RegExp(''))) {
																const result = z.array(z.string()).safeParse(value[key])
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
														}
													})
													.describe(
														'Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'
													),
											})
											.describe('Describes the foundations of all NMOS resources'),
										z.object({
											device_id: idPrimitive
												.describe(
													'Device ID which this Receiver forms part of. This attribute is used to ensure referential integrity by registry implementations.'
												),
											transport: z
												.any()
												.superRefine((x, ctx) => {
													const schemas = [
														z.any(),
														z
															.any()
															.refine(
																(value) => !z.any().safeParse(value).success,
																'Invalid input: Should NOT be valid against schema'
															),
													]
													const errors = schemas.reduce<z.ZodError[]>(
														(errors, schema) =>
															((result) =>
																result.error ? [...errors, result.error] : errors)(
																schema.safeParse(x)
															),
														[]
													)
													if (schemas.length - errors.length !== 1) {
														ctx.addIssue({
															path: ctx.path,
															code: 'invalid_union',
															unionErrors: errors,
															message: 'Invalid input: Should pass single schema',
														})
													}
												})
												.describe('Transport type accepted by the Receiver in URN format'),
											interface_bindings: z
												.array(z.string())
												.describe(
													'Binding of Receiver ingress ports to interfaces on the parent Node.'
												),
											subscription: z
												.object({
													sender_id: z
														.union([
															idPrimitive
																.describe(
																	'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
																),
															z
																.null()
																.describe(
																	'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
																)
																.default(null),
														])
														.describe(
															'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
														)
														.default(null),
													active: z
														.boolean()
														.describe('Receiver is enabled and configured to receive data')
														.default(false),
												})
												.describe(
													'Object indicating how this Receiver is currently configured to receive data.'
												),
										})
									)
								)
								.describe('Describes a receiver'),
							z.object({
								format: z
									.literal('urn:x-nmos:format:video')
									.describe('Type of Flow accepted by the Receiver as a URN'),
								caps: z
									.object({
										media_types: z
											.array(z.union([z.enum(['video/raw', 'video/H264', 'video/vc2']), z.any()]))
											.min(1)
											.describe(
												'Subclassification of the formats accepted using IANA assigned media types'
											)
											.optional(),
									})
									.describe('Capabilities'),
							})
						)
					)
					.describe('Describes a video Receiver'),
				z
					.record(z.any())
					.and(
						z.intersection(
							z
								.record(z.any())
								.and(
									z.intersection(
										z
											.object({
												id: idPrimitive
													.describe('Globally unique identifier for the resource'),
												version: z
													.string()
													.regex(new RegExp('^[0-9]+:[0-9]+$'))
													.describe(
														'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
													),
												label: z.string().describe('Freeform string label for the resource'),
												description: z
													.string()
													.describe('Detailed description of the resource'),
												tags: z
													.record(z.array(z.string()))
													.superRefine((value, ctx) => {
														for (const key in value) {
															if (key.match(new RegExp(''))) {
																const result = z.array(z.string()).safeParse(value[key])
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
														}
													})
													.describe(
														'Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'
													),
											})
											.describe('Describes the foundations of all NMOS resources'),
										z.object({
											device_id: idPrimitive
												.describe(
													'Device ID which this Receiver forms part of. This attribute is used to ensure referential integrity by registry implementations.'
												),
											transport: z
												.any()
												.superRefine((x, ctx) => {
													const schemas = [
														z.any(),
														z
															.any()
															.refine(
																(value) => !z.any().safeParse(value).success,
																'Invalid input: Should NOT be valid against schema'
															),
													]
													const errors = schemas.reduce<z.ZodError[]>(
														(errors, schema) =>
															((result) =>
																result.error ? [...errors, result.error] : errors)(
																schema.safeParse(x)
															),
														[]
													)
													if (schemas.length - errors.length !== 1) {
														ctx.addIssue({
															path: ctx.path,
															code: 'invalid_union',
															unionErrors: errors,
															message: 'Invalid input: Should pass single schema',
														})
													}
												})
												.describe('Transport type accepted by the Receiver in URN format'),
											interface_bindings: z
												.array(z.string())
												.describe(
													'Binding of Receiver ingress ports to interfaces on the parent Node.'
												),
											subscription: z
												.object({
													sender_id: z
														.union([
															idPrimitive
																.describe(
																	'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
																),
															z
																.null()
																.describe(
																	'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
																)
																.default(null),
														])
														.describe(
															'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
														)
														.default(null),
													active: z
														.boolean()
														.describe('Receiver is enabled and configured to receive data')
														.default(false),
												})
												.describe(
													'Object indicating how this Receiver is currently configured to receive data.'
												),
										})
									)
								)
								.describe('Describes a receiver'),
							z.object({
								format: z
									.literal('urn:x-nmos:format:audio')
									.describe('Type of Flow accepted by the Receiver as a URN'),
								caps: z
									.object({
										media_types: z
											.array(
												z.union([
													z.enum(['audio/L24', 'audio/L20', 'audio/L16', 'audio/L8']),
													z.any(),
												])
											)
											.min(1)
											.describe(
												'Subclassification of the formats accepted using IANA assigned media types'
											)
											.optional(),
									})
									.describe('Capabilities'),
							})
						)
					)
					.describe('Describes an audio Receiver'),
				z
					.record(z.any())
					.and(
						z.intersection(
							z
								.record(z.any())
								.and(
									z.intersection(
										z
											.object({
												id: idPrimitive
													.describe('Globally unique identifier for the resource'),
												version: z
													.string()
													.regex(new RegExp('^[0-9]+:[0-9]+$'))
													.describe(
														'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
													),
												label: z.string().describe('Freeform string label for the resource'),
												description: z
													.string()
													.describe('Detailed description of the resource'),
												tags: z
													.record(z.array(z.string()))
													.superRefine((value, ctx) => {
														for (const key in value) {
															if (key.match(new RegExp(''))) {
																const result = z.array(z.string()).safeParse(value[key])
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
														}
													})
													.describe(
														'Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'
													),
											})
											.describe('Describes the foundations of all NMOS resources'),
										z.object({
											device_id: idPrimitive
												.describe(
													'Device ID which this Receiver forms part of. This attribute is used to ensure referential integrity by registry implementations.'
												),
											transport: z
												.any()
												.superRefine((x, ctx) => {
													const schemas = [
														z.any(),
														z
															.any()
															.refine(
																(value) => !z.any().safeParse(value).success,
																'Invalid input: Should NOT be valid against schema'
															),
													]
													const errors = schemas.reduce<z.ZodError[]>(
														(errors, schema) =>
															((result) =>
																result.error ? [...errors, result.error] : errors)(
																schema.safeParse(x)
															),
														[]
													)
													if (schemas.length - errors.length !== 1) {
														ctx.addIssue({
															path: ctx.path,
															code: 'invalid_union',
															unionErrors: errors,
															message: 'Invalid input: Should pass single schema',
														})
													}
												})
												.describe('Transport type accepted by the Receiver in URN format'),
											interface_bindings: z
												.array(z.string())
												.describe(
													'Binding of Receiver ingress ports to interfaces on the parent Node.'
												),
											subscription: z
												.object({
													sender_id: z
														.union([
															idPrimitive
																.describe(
																	'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
																),
															z
																.null()
																.describe(
																	'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
																)
																.default(null),
														])
														.describe(
															'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
														)
														.default(null),
													active: z
														.boolean()
														.describe('Receiver is enabled and configured to receive data')
														.default(false),
												})
												.describe(
													'Object indicating how this Receiver is currently configured to receive data.'
												),
										})
									)
								)
								.describe('Describes a receiver'),
							z.object({
								format: z
									.literal('urn:x-nmos:format:data')
									.describe('Type of Flow accepted by the Receiver as a URN'),
								caps: z
									.object({
										media_types: z
											.array(z.union([z.enum(['video/smpte291', 'application/json']), z.any()]))
											.min(1)
											.describe(
												'Subclassification of the formats accepted using IANA assigned media types'
											)
											.optional(),
										event_types: z
											.array(z.string())
											.min(1)
											.describe(
												'Subclassification of the event types accepted defined by the AMWA IS-07 specification'
											)
											.optional(),
									})
									.describe('Capabilities'),
							})
						)
					)
					.describe('Describes a data Receiver'),
				z
					.record(z.any())
					.and(
						z.intersection(
							z
								.record(z.any())
								.and(
									z.intersection(
										z
											.object({
												id: idPrimitive
													.describe('Globally unique identifier for the resource'),
												version: z
													.string()
													.regex(new RegExp('^[0-9]+:[0-9]+$'))
													.describe(
														'String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'
													),
												label: z.string().describe('Freeform string label for the resource'),
												description: z
													.string()
													.describe('Detailed description of the resource'),
												tags: z
													.record(z.array(z.string()))
													.superRefine((value, ctx) => {
														for (const key in value) {
															if (key.match(new RegExp(''))) {
																const result = z.array(z.string()).safeParse(value[key])
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
														}
													})
													.describe(
														'Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'
													),
											})
											.describe('Describes the foundations of all NMOS resources'),
										z.object({
											device_id: idPrimitive
												.describe(
													'Device ID which this Receiver forms part of. This attribute is used to ensure referential integrity by registry implementations.'
												),
											transport: z
												.any()
												.superRefine((x, ctx) => {
													const schemas = [
														z.any(),
														z
															.any()
															.refine(
																(value) => !z.any().safeParse(value).success,
																'Invalid input: Should NOT be valid against schema'
															),
													]
													const errors = schemas.reduce<z.ZodError[]>(
														(errors, schema) =>
															((result) =>
																result.error ? [...errors, result.error] : errors)(
																schema.safeParse(x)
															),
														[]
													)
													if (schemas.length - errors.length !== 1) {
														ctx.addIssue({
															path: ctx.path,
															code: 'invalid_union',
															unionErrors: errors,
															message: 'Invalid input: Should pass single schema',
														})
													}
												})
												.describe('Transport type accepted by the Receiver in URN format'),
											interface_bindings: z
												.array(z.string())
												.describe(
													'Binding of Receiver ingress ports to interfaces on the parent Node.'
												),
											subscription: z
												.object({
													sender_id: z
														.union([
															idPrimitive
																.describe(
																	'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
																),
															z
																.null()
																.describe(
																	'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
																)
																.default(null),
														])
														.describe(
															'UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'
														)
														.default(null),
													active: z
														.boolean()
														.describe('Receiver is enabled and configured to receive data')
														.default(false),
												})
												.describe(
													'Object indicating how this Receiver is currently configured to receive data.'
												),
										})
									)
								)
								.describe('Describes a receiver'),
							z.object({
								format: z
									.literal('urn:x-nmos:format:mux')
									.describe('Type of Flow accepted by the Receiver as a URN'),
								caps: z
									.object({
										media_types: z
											.array(z.union([z.literal('video/SMPTE2022-6'), z.any()]))
											.min(1)
											.describe(
												'Subclassification of the formats accepted using IANA assigned media types'
											)
											.optional(),
									})
									.describe('Capabilities'),
							})
						)
					)
					.describe('Describes a mux Receiver'),
			]
			const errors = schemas.reduce<z.ZodError[]>(
				(errors, schema) =>
					((result) => (result.error ? [...errors, result.error] : errors))(schema.safeParse(x)),
				[]
			)
			if (schemas.length - errors.length !== 1) {
				ctx.addIssue({
					path: ctx.path,
					code: 'invalid_union',
					unionErrors: errors,
					message: 'Invalid input: Should pass single schema',
				})
			}
		})
	)
	.describe('Describes a Receiver')
