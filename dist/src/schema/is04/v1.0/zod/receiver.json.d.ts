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
    transport: z.ZodEnum<["urn:x-nmos:transport:rtp", "urn:x-nmos:transport:rtp.ucast", "urn:x-nmos:transport:rtp.mcast", "urn:x-nmos:transport:dash"]>;
    subscription: z.ZodObject<{
        sender_id: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodDefault<z.ZodNull>]>>;
    }, "strip", z.ZodTypeAny, {
        sender_id: string | null;
    }, {
        sender_id?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    version: string;
    label: string;
    description: string;
    format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    caps: Record<string, any>;
    tags: Record<string, string[]>;
    device_id: string;
    transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
    subscription: {
        sender_id: string | null;
    };
}, {
    id: string;
    version: string;
    label: string;
    description: string;
    format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    caps: Record<string, any>;
    tags: Record<string, string[]>;
    device_id: string;
    transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
    subscription: {
        sender_id?: string | null | undefined;
    };
}>;
export default _default;
