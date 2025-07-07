import { z } from 'zod'
import { idPrimitive, versionPrimitive } from '../../v1.2/zod/_primitives'

export default z
	.object({
		grain_type: z.literal('event').describe("Type of data contained within the 'grain' attribute's payload"),
		source_id: idPrimitive.describe('Source ID of the Query API instance issuing the data Grain'),
		flow_id: idPrimitive.describe('Subscription ID under the /subscriptions/ resource of the Query API'),
		origin_timestamp: versionPrimitive.describe(
			"TAI timestamp at which this data Grain's payload was generated in the format <ts_secs>:<ts_nsecs>",
		),
		sync_timestamp: versionPrimitive.describe(
			"TAI timestamp at which this data Grain's payload was generated in the format <ts_secs>:<ts_nsecs>",
		),
		creation_timestamp: versionPrimitive.describe(
			"TAI timestamp at which this data Grain's metadata was generated in the format <ts_secs>:<ts_nsecs>",
		),
		rate: z
			.object({
				numerator: z.number().int().gte(0).describe('Numerator of the Grain rate'),
				denominator: z.number().int().gte(1).describe('Denominator of the Grain rate'),
			})
			.describe('Rate at which Grains will be received within this Flow (if applicable)'),
		duration: z
			.object({
				numerator: z.number().int().gte(0).describe('Numerator of the Grain duration'),
				denominator: z.number().int().gte(1).describe('Denominator of the Grain duration'),
			})
			.describe('Duration over which this Grain is valid or should be presented (if applicable)'),
		grain: z
			.object({
				type: z
					.literal('urn:x-nmos:format:data.event')
					.describe('Format classifier for the data contained in this payload'),
				topic: z
					.enum(['/nodes/', '/devices/', '/sources/', '/flows/', '/senders/', '/receivers/'])
					.describe('Query API topic which has been subscribed to using this WebSocket'),
				data: z
					.array(
						z
							.object({
								path: idPrimitive.describe(
									'ID of the resource which has undergone a change (may be a Node ID, Device ID etc.)',
								),
								pre: z
									.object({
										id: idPrimitive,
										version: versionPrimitive,
									})
									.passthrough()
									.optional(),
								post: z
									.object({
										id: idPrimitive,
										version: versionPrimitive,
									})
									.passthrough()
									.optional(),
							})
							.describe(
								'A single object identifying a change which has occurred under a particular API resource',
							),
					)
					.min(1)
					.describe(
						'An array of changes which have occurred and are being passed to the subscription client',
					),
			})
			.describe('Payload of the data Grain'),
	})
	.describe('Describes a data Grain sent via the a Query API WebSocket subscription')
