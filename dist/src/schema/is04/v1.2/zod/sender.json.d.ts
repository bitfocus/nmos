import { z } from 'zod';
declare const _default: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodObject<{
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
    caps: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    flow_id: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodDefault<z.ZodNull>]>>;
    transport: z.ZodEffects<z.ZodAny, any, any>;
    device_id: z.ZodString;
    manifest_href: z.ZodString;
    interface_bindings: z.ZodArray<z.ZodString, "many">;
    subscription: z.ZodObject<{
        receiver_id: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodDefault<z.ZodNull>]>>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        active: boolean;
        receiver_id: string | null;
    }, {
        active?: boolean | undefined;
        receiver_id?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    device_id: string;
    interface_bindings: string[];
    subscription: {
        active: boolean;
        receiver_id: string | null;
    };
    flow_id: string | null;
    manifest_href: string;
    transport?: any;
    caps?: {} | undefined;
}, {
    device_id: string;
    interface_bindings: string[];
    subscription: {
        active?: boolean | undefined;
        receiver_id?: string | null | undefined;
    };
    manifest_href: string;
    transport?: any;
    caps?: {} | undefined;
    flow_id?: string | null | undefined;
}>>>;
export default _default;
