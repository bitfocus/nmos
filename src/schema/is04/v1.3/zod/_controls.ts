import { z } from "zod";
import { URNControlSchema } from "./_urns";

/**
 * V1.3 is with auth (not V1.2)
 */
export const _deviceControlsItemWithAuth = z.object({
	href: z
		.string()
		.url()
		.describe('URL to reach a control endpoint, whether http or otherwise'),
	type: URNControlSchema.describe('URN identifying the control format'),
	authorization: z
		.boolean()
		.describe('This endpoint requires authorization')
		.default(false),
})