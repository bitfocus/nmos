import { z } from 'zod';
declare const _default: z.ZodObject<{
    max_update_rate_ms: z.ZodDefault<z.ZodNumber>;
    persist: z.ZodDefault<z.ZodBoolean>;
    secure: z.ZodOptional<z.ZodBoolean>;
    resource_path: z.ZodEnum<["/nodes", "/devices", "/sources", "/flows", "/senders", "/receivers"]>;
    params: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    params: Record<string, any>;
    max_update_rate_ms: number;
    persist: boolean;
    resource_path: "/nodes" | "/devices" | "/sources" | "/flows" | "/senders" | "/receivers";
    secure?: boolean | undefined;
}, {
    params: Record<string, any>;
    resource_path: "/nodes" | "/devices" | "/sources" | "/flows" | "/senders" | "/receivers";
    max_update_rate_ms?: number | undefined;
    persist?: boolean | undefined;
    secure?: boolean | undefined;
}>;
export default _default;
