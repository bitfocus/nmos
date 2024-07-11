import { z } from 'zod';
declare const _default: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    version: z.ZodString;
    label: z.ZodString;
    href: z.ZodString;
    hostname: z.ZodOptional<z.ZodString>;
    caps: z.ZodRecord<z.ZodString, z.ZodAny>;
    services: z.ZodArray<z.ZodObject<{
        href: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        href: string;
    }, {
        type: string;
        href: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    version: string;
    label: string;
    href: string;
    caps: Record<string, any>;
    services: {
        type: string;
        href: string;
    }[];
    hostname?: string | undefined;
}, {
    id: string;
    version: string;
    label: string;
    href: string;
    caps: Record<string, any>;
    services: {
        type: string;
        href: string;
    }[];
    hostname?: string | undefined;
}>, "many">;
export default _default;
