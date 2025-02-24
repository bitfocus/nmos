import { z } from "zod";

export const _flowVideoCore = z.object({
    format: z
        .literal('urn:x-nmos:format:video')
        .describe('Format of the data coming from the Flow as a URN'),
    frame_width: z.number().int().describe('Width of the picture in pixels'),
    frame_height: z.number().int().describe('Height of the picture in pixels'),
    interlace_mode: z
        .enum(['progressive', 'interlaced_tff', 'interlaced_bff', 'interlaced_psf'])
        .describe('Interlaced video mode for frames in this Flow')
        .default('progressive'),
    colorspace: z
        .union([z.enum(['BT601', 'BT709', 'BT2020', 'BT2100']), z.any()])
        .describe(
            'Colorspace used for the video. Any values not defined in the enum should be defined in the NMOS Parameter Registers'
        ),
    transfer_characteristic: z
        .union([z.enum(['SDR', 'HLG', 'PQ']), z.any()])
        .describe(
            'Transfer characteristic. Any values not defined in the enum should be defined in the NMOS Parameter Registers'
        )
        .default('SDR'),
})