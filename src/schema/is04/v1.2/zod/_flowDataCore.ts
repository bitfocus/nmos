import { z } from "zod";

export const _flowDataCore = z.object({
    format: z.literal('urn:x-nmos:format:data'),
    media_type: z.string(),
})

