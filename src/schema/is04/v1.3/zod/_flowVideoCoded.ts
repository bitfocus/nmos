import { z } from "zod";

export const _flowVideoCodedH264 = z.object({
    media_type: z
        .literal('video/H264')
        .describe('Subclassification of the format using IANA assigned media types'),
})

export const _flowVideoCodedVC2 = z.object({
    media_type: z
        .literal('video/vc2')
        .describe('Subclassification of the format using IANA assigned media types'),
})

