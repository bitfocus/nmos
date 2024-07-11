import { z } from 'zod';
declare const _default: z.ZodObject<{
    id: z.ZodString;
    version: z.ZodString;
    label: z.ZodString;
    type: z.ZodString;
    node_id: z.ZodString;
    senders: z.ZodArray<z.ZodString, "many">;
    receivers: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    version: string;
    label: string;
    node_id: string;
    senders: string[];
    receivers: string[];
}, {
    type: string;
    id: string;
    version: string;
    label: string;
    node_id: string;
    senders: string[];
    receivers: string[];
}>;
export default _default;
