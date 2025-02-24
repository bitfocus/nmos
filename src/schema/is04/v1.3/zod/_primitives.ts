import { z } from "zod";

export const idPrimitive = z.string().regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
export const versionPrimitive = z.string().regex(new RegExp('^[0-9]+:[0-9]+$'))
export const _audioChannels = z.array(
    z.object({
        label: z.string().describe('Label for this channel (free text)'),
        symbol: z
            .union([
                z.enum([
                    'L',
                    'R',
                    'C',
                    'LFE',
                    'Ls',
                    'Rs',
                    'Lss',
                    'Rss',
                    'Lrs',
                    'Rrs',
                    'Lc',
                    'Rc',
                    'Cs',
                    'HI',
                    'VIN',
                    'M1',
                    'M2',
                    'Lt',
                    'Rt',
                    'Lst',
                    'Rst',
                    'S',
                ]),
                z
                    .string()
                    .regex(/^NSC(0[0-9][0-9]|1[0-1][0-9]|12[0-8])$/)
                    .describe('Numbered Source Channel'),
                z
                    .string()
                    .regex(/^U(0[1-9]|[1-5][0-9]|6[0-4])$/)
                    .describe('Undefined channel'),
            ]).optional().describe(
                'Symbol for this channel (from VSF TR-03 Appendix A)'
            ),
    })
)
    .min(1)
export const _macAdressPrimitive = z
    .string()
    .regex(new RegExp('^([0-9a-f]{2}-){5}([0-9a-f]{2})$'))