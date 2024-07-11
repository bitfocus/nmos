import { z } from 'zod';
declare const _default: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    version: z.ZodString;
    label: z.ZodString;
    description: z.ZodString;
    format: z.ZodEnum<["urn:x-nmos:format:video", "urn:x-nmos:format:audio", "urn:x-nmos:format:data"]>;
    tags: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    source_id: z.ZodString;
    parents: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    version: string;
    label: string;
    description: string;
    tags: Record<string, string[]>;
    format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    parents: string[];
    source_id: string;
}, {
    id: string;
    version: string;
    label: string;
    description: string;
    tags: Record<string, string[]>;
    format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    parents: string[];
    source_id: string;
}>, "many">;
export default _default;
