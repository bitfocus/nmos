import { z } from "zod";

export const _flowMuxCore = z.object({
    format: z
        .literal('urn:x-nmos:format:mux')
        .describe('Format of the data coming from the Flow as a URN'),
    media_type: z
        .union([z.literal('video/SMPTE2022-6'), z.any()])
        .describe('Subclassification of the format using IANA assigned media types'),
})