import { z } from "zod";

export const _flowDataEventCore = z.object({
    format: z.literal('urn:x-nmos:format:data.event'),
})

