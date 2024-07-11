import { z } from 'zod';
declare const _default: z.ZodObject<{
    name: z.ZodString;
    ref_type: z.ZodLiteral<"ptp">;
    traceable: z.ZodBoolean;
    version: z.ZodLiteral<"IEEE1588-2008">;
    gmid: z.ZodString;
    locked: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    version: "IEEE1588-2008";
    name: string;
    ref_type: "ptp";
    traceable: boolean;
    gmid: string;
    locked: boolean;
}, {
    version: "IEEE1588-2008";
    name: string;
    ref_type: "ptp";
    traceable: boolean;
    gmid: string;
    locked: boolean;
}>;
export default _default;
