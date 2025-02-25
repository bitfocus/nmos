import { z } from "zod";
import { URNControlSchema } from "./_urns";

/**
 * V1.2 is without auth
 */
export const _deviceControlsItem = z.object({
    href: z
        .string()
        .url()
        .describe('URL to reach a control endpoint, whether http or otherwise'),
    type: URNControlSchema.describe('URN identifying the control format'),
})