import { z } from "zod";

export const _flowDataSDIAncillaryCore = z.object({
    format: z
        .literal('urn:x-nmos:format:data')
        .describe('Format of the data coming from the Flow as a URN'),
    media_type: z
        .literal('video/smpte291')
        .describe('Subclassification of the format using IANA assigned media types'),
    DID_SDID: z
        .array(
            z.object({
                DID: z
                    .string()
                    .regex(new RegExp('^0x[0-9a-fA-F]{2}$'))
                    .describe('Data identification word')
                    .optional(),
                SDID: z
                    .string()
                    .regex(new RegExp('^0x[0-9a-fA-F]{2}$'))
                    .describe('Secondary data identification word')
                    .optional(),
            })
        )
        .describe('List of Data identification and Secondary data identification words')
        .optional(),
})