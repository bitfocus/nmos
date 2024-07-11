import { z } from 'zod';
declare const _default: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    ws_href: z.ZodString;
    max_update_rate_ms: z.ZodDefault<z.ZodNumber>;
    persist: z.ZodDefault<z.ZodBoolean>;
    secure: z.ZodBoolean;
    resource_path: z.ZodEnum<["/nodes", "/devices", "/sources", "/flows", "/senders", "/receivers"]>;
    params: z.ZodRecord<z.ZodString, z.ZodAny>;
    authorization: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    params: Record<string, any>;
    id: string;
    ws_href: string;
    max_update_rate_ms: number;
    persist: boolean;
    resource_path: "/nodes" | "/devices" | "/sources" | "/flows" | "/senders" | "/receivers";
    secure: boolean;
    authorization?: boolean | undefined;
}, {
    params: Record<string, any>;
    id: string;
    ws_href: string;
    resource_path: "/nodes" | "/devices" | "/sources" | "/flows" | "/senders" | "/receivers";
    secure: boolean;
    authorization?: boolean | undefined;
    max_update_rate_ms?: number | undefined;
    persist?: boolean | undefined;
}>, "many">;
export default _default;
