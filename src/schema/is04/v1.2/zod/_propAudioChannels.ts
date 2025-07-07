import { z } from "zod";


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
    .min(1);
