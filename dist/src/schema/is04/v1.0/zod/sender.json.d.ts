import { z } from 'zod';
declare const _default: z.ZodObject<{
    id: z.ZodString;
    version: z.ZodString;
    label: z.ZodString;
    description: z.ZodString;
    flow_id: z.ZodString;
    transport: z.ZodEnum<["urn:x-nmos:transport:rtp", "urn:x-nmos:transport:rtp.ucast", "urn:x-nmos:transport:rtp.mcast", "urn:x-nmos:transport:dash"]>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>>;
    device_id: z.ZodString;
    manifest_href: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    version: string;
    label: string;
    description: string;
    flow_id: string;
    transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
    device_id: string;
    manifest_href: string;
    tags?: Record<string, string[]> | undefined;
}, {
    id: string;
    version: string;
    label: string;
    description: string;
    flow_id: string;
    transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
    device_id: string;
    manifest_href: string;
    tags?: Record<string, string[]> | undefined;
}>;
export default _default;
