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
    type: z.ZodEffects<z.ZodAny, any, any>;
    node_id: z.ZodString;
    senders: z.ZodArray<z.ZodString, "many">;
    receivers: z.ZodArray<z.ZodString, "many">;
    controls: z.ZodArray<z.ZodObject<{
        href: z.ZodString;
        type: z.ZodString;
        authorization: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        href: string;
        authorization: boolean;
    }, {
        type: string;
        href: string;
        authorization?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    node_id: string;
    senders: string[];
    receivers: string[];
    controls: {
        type: string;
        href: string;
        authorization: boolean;
    }[];
    type?: any;
}, {
    node_id: string;
    senders: string[];
    receivers: string[];
    controls: {
        type: string;
        href: string;
        authorization?: boolean | undefined;
    }[];
    type?: any;
}>>>, "many">;
export default _default;
