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
    device_id: z.ZodString;
    transport: z.ZodEffects<z.ZodAny, any, any>;
    interface_bindings: z.ZodArray<z.ZodString, "many">;
    subscription: z.ZodObject<{
        sender_id: z.ZodDefault<z.ZodUnion<[z.ZodDefault<z.ZodString>, z.ZodDefault<z.ZodNull>]>>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        active: boolean;
        sender_id: string | null;
    }, {
        active?: boolean | undefined;
        sender_id?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    device_id: string;
    interface_bindings: string[];
    subscription: {
        active: boolean;
        sender_id: string | null;
    };
    transport?: any;
}, {
    device_id: string;
    interface_bindings: string[];
    subscription: {
        active?: boolean | undefined;
        sender_id?: string | null | undefined;
    };
    transport?: any;
}>>>;
export default _default;
