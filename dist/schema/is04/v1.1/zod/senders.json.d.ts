import { z } from 'zod';
declare const _default: z.ZodArray<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodObject<{
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
    flow_id: z.ZodDefault<z.ZodUnion<[z.ZodDefault<z.ZodString>, z.ZodDefault<z.ZodNull>]>>;
    transport: z.ZodEffects<z.ZodAny, any, any>;
    device_id: z.ZodString;
    manifest_href: z.ZodString;
}, "strip", z.ZodTypeAny, {
    flow_id: string | null;
    device_id: string;
    manifest_href: string;
    transport?: any;
}, {
    device_id: string;
    manifest_href: string;
    flow_id?: string | null | undefined;
    transport?: any;
}>>>, "many">;
export default _default;
