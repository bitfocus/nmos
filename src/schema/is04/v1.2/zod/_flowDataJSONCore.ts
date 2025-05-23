import { z } from "zod";

export const _flowDataJSONCore = z.object({
    format: z
        .literal('urn:x-nmos:format:data')
        .describe('Format of the data coming from the Flow as a URN'),
    media_type: z
        .literal('application/json')
        .describe('Subclassification of the format using IANA assigned media types'),
   
})