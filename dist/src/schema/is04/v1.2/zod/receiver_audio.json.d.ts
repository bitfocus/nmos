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
    device_id: z.ZodString;
    transport: z.ZodEffects<z.ZodAny, any, any>;
    interface_bindings: z.ZodArray<z.ZodString, "many">;
    subscription: z.ZodObject<{
        sender_id: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        sender_id: string | null;
        active: boolean;
    }, {
        sender_id?: string | null | undefined;
        active?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    device_id: string;
    interface_bindings: string[];
    subscription: {
        sender_id: string | null;
        active: boolean;
    };
    transport?: any;
}, {
    device_id: string;
    interface_bindings: string[];
    subscription: {
        sender_id?: string | null | undefined;
        active?: boolean | undefined;
    };
    transport?: any;
}>>>, z.ZodObject<{
    format: z.ZodLiteral<"urn:x-nmos:format:audio">;
    caps: z.ZodObject<{
        media_types: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodEnum<["audio/L24", "audio/L20", "audio/L16", "audio/L8"]>, z.ZodAny]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        media_types?: any[] | undefined;
    }, {
        media_types?: any[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    format: "urn:x-nmos:format:audio";
    caps: {
        media_types?: any[] | undefined;
    };
}, {
    format: "urn:x-nmos:format:audio";
    caps: {
        media_types?: any[] | undefined;
    };
}>>>;
export default _default;
