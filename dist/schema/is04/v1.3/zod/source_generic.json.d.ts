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
    caps: z.ZodRecord<z.ZodString, z.ZodAny>;
    device_id: z.ZodString;
    parents: z.ZodArray<z.ZodString, "many">;
    clock_name: z.ZodUnion<[z.ZodString, z.ZodNull]>;
}, "strip", z.ZodTypeAny, {
    caps: Record<string, any>;
    device_id: string;
    parents: string[];
    clock_name: string | null;
    grain_rate?: {
        numerator: number;
        denominator: number;
    } | undefined;
}, {
    caps: Record<string, any>;
    device_id: string;
    parents: string[];
    clock_name: string | null;
    grain_rate?: {
        numerator: number;
        denominator?: number | undefined;
    } | undefined;
}>>>, z.ZodObject<{
    format: z.ZodEnum<["urn:x-nmos:format:video", "urn:x-nmos:format:mux"]>;
}, "strip", z.ZodTypeAny, {
    format: "urn:x-nmos:format:video" | "urn:x-nmos:format:mux";
}, {
    format: "urn:x-nmos:format:video" | "urn:x-nmos:format:mux";
}>>>;
export default _default;
