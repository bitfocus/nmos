import { z } from 'zod';
declare const _default: z.ZodObject<{
    code: z.ZodNumber;
    error: z.ZodString;
    debug: z.ZodUnion<[z.ZodNull, z.ZodString]>;
}, "strip", z.ZodTypeAny, {
    code: number;
    error: string;
    debug: string | null;
}, {
    code: number;
    error: string;
    debug: string | null;
}>;
export default _default;
