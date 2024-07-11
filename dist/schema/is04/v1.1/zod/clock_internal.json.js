"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .regex(new RegExp('^clk[0-9]+$'))
        .describe('Name of this refclock (unique for this set of clocks)'),
    ref_type: zod_1.z.literal('internal').describe('Type of external reference used by this clock'),
})
    .describe('Describes a clock with no external reference');
