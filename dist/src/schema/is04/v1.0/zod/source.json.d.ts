import { z } from 'zod';
declare const _default: z.ZodObject<{
    id: z.ZodString;
    version: z.ZodString;
    label: z.ZodString;
    description: z.ZodString;
    format: z.ZodEnum<["urn:x-nmos:format:video", "urn:x-nmos:format:audio", "urn:x-nmos:format:data"]>;
    caps: z.ZodRecord<z.ZodString, z.ZodAny>;
    tags: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    device_id: z.ZodString;
    parents: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    version: string;
    label: string;
    description: string;
    tags: Record<string, string[]>;
    caps: Record<string, any>;
    device_id: string;
    format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    parents: string[];
}, {
    id: string;
    version: string;
    label: string;
    description: string;
    tags: Record<string, string[]>;
    caps: Record<string, any>;
    device_id: string;
    format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    parents: string[];
}>;
export default _default;
