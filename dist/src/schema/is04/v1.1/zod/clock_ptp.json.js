"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .regex(new RegExp('^clk[0-9]+$'))
        .describe('Name of this refclock (unique for this set of clocks)'),
    ref_type: zod_1.z.literal('ptp').describe('Type of external reference used by this clock'),
    traceable: zod_1.z.boolean().describe('External refclock is synchronised to International Atomic Time (TAI)'),
    version: zod_1.z.literal('IEEE1588-2008').describe('Version of PTP reference used by this clock'),
    gmid: zod_1.z
        .string()
        .regex(new RegExp('^[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}$'))
        .describe('ID of the PTP reference used by this clock'),
    locked: zod_1.z
        .boolean()
        .describe('Lock state of this clock to the external reference. If true, this device is slaved, otherwise it has no defined relationship to the external reference'),
})
    .describe('Describes a clock referenced to PTP');
