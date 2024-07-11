import { z } from 'zod';
declare const _default: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    version: z.ZodString;
    label: z.ZodString;
    description: z.ZodString;
    tags: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    version: string;
    label: string;
    description: string;
    tags: Record<string, string[]>;
}, {
    id: string;
    version: string;
    label: string;
    description: string;
    tags: Record<string, string[]>;
}>, z.ZodObject<{
    grain_rate: z.ZodOptional<z.ZodObject<{
        numerator: z.ZodNumber;
        denominator: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        numerator: number;
        denominator: number;
    }, {
        numerator: number;
        denominator?: number | undefined;
    }>>;
    source_id: z.ZodString;
    device_id: z.ZodString;
    parents: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    device_id: string;
    parents: string[];
    source_id: string;
    grain_rate?: {
        numerator: number;
        denominator: number;
    } | undefined;
}, {
    device_id: string;
    parents: string[];
    source_id: string;
    grain_rate?: {
        numerator: number;
        denominator?: number | undefined;
    } | undefined;
}>>>, z.ZodObject<{
    format: z.ZodLiteral<"urn:x-nmos:format:data">;
    media_type: z.ZodLiteral<"video/smpte291">;
    DID_SDID: z.ZodOptional<z.ZodArray<z.ZodObject<{
        DID: z.ZodOptional<z.ZodString>;
        SDID: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        DID?: string | undefined;
        SDID?: string | undefined;
    }, {
        DID?: string | undefined;
        SDID?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    format: "urn:x-nmos:format:data";
    media_type: "video/smpte291";
    DID_SDID?: {
        DID?: string | undefined;
        SDID?: string | undefined;
    }[] | undefined;
}, {
    format: "urn:x-nmos:format:data";
    media_type: "video/smpte291";
    DID_SDID?: {
        DID?: string | undefined;
        SDID?: string | undefined;
    }[] | undefined;
}>>>;
export default _default;
