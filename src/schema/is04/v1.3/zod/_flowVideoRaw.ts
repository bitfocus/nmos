import { z } from "zod";

export const _flowVideoRawComponent = z.object({
    name: z
                    .enum(['Y', 'Cb', 'Cr', 'I', 'Ct', 'Cp', 'A', 'R', 'G', 'B', 'DepthMap'])
                    .describe('Name of this component'),
    width: z.number().int().describe('Width of this component in pixels'),
    height: z.number().int().describe('Height of this component in pixels'),
    bit_depth: z
        .number()
        .int()
        .describe('Number of bits used to describe each sample'),
})

export const _flowVideoRaw = z.object({
    media_type: z
        .literal('video/raw')
        .describe('Subclassification of the format using IANA assigned media types'),
    components: z
        .array(
            _flowVideoRawComponent
        )
        .min(1)
        .describe('Array of objects describing the components'),
})