import { z } from 'zod';
declare const _default: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodObject<{
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
    format: z.ZodLiteral<"urn:x-nmos:format:video">;
    frame_width: z.ZodNumber;
    frame_height: z.ZodNumber;
    interlace_mode: z.ZodDefault<z.ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
    colorspace: z.ZodUnion<[z.ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>, z.ZodAny]>;
    transfer_characteristic: z.ZodDefault<z.ZodUnion<[z.ZodEnum<["SDR", "HLG", "PQ"]>, z.ZodAny]>>;
}, "strip", z.ZodTypeAny, {
    format: "urn:x-nmos:format:video";
    frame_width: number;
    frame_height: number;
    interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
    colorspace?: any;
    transfer_characteristic?: any;
}, {
    format: "urn:x-nmos:format:video";
    frame_width: number;
    frame_height: number;
    interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
    colorspace?: any;
    transfer_characteristic?: any;
}>>>, z.ZodObject<{
    media_type: z.ZodLiteral<"video/raw">;
    components: z.ZodArray<z.ZodObject<{
        name: z.ZodEnum<["Y", "Cb", "Cr", "I", "Ct", "Cp", "A", "R", "G", "B", "DepthMap"]>;
        width: z.ZodNumber;
        height: z.ZodNumber;
        bit_depth: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: "R" | "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "G" | "B" | "DepthMap";
        width: number;
        height: number;
        bit_depth: number;
    }, {
        name: "R" | "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "G" | "B" | "DepthMap";
        width: number;
        height: number;
        bit_depth: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    media_type: "video/raw";
    components: {
        name: "R" | "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "G" | "B" | "DepthMap";
        width: number;
        height: number;
        bit_depth: number;
    }[];
}, {
    media_type: "video/raw";
    components: {
        name: "R" | "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "G" | "B" | "DepthMap";
        width: number;
        height: number;
        bit_depth: number;
    }[];
}>>>;
export default _default;
