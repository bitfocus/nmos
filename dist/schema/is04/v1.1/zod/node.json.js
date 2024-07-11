"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .record(zod_1.z.any())
    .and(zod_1.z.intersection(zod_1.z
    .object({
    id: zod_1.z
        .string()
        .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
        .describe('Globally unique identifier for the resource'),
    version: zod_1.z
        .string()
        .regex(new RegExp('^[0-9]+:[0-9]+$'))
        .describe('String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'),
    label: zod_1.z.string().describe('Freeform string label for the resource'),
    description: zod_1.z.string().describe('Detailed description of the resource'),
    tags: zod_1.z
        .record(zod_1.z.array(zod_1.z.string()))
        .superRefine((value, ctx) => {
        for (const key in value) {
            if (key.match(new RegExp(''))) {
                const result = zod_1.z.array(zod_1.z.string()).safeParse(value[key]);
                if (!result.success) {
                    ctx.addIssue({
                        path: [...ctx.path, key],
                        code: 'custom',
                        message: `Invalid input: Key matching regex /${key}/ must match schema`,
                        params: {
                            issues: result.error.issues,
                        },
                    });
                }
            }
        }
    })
        .describe('Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'),
})
    .describe('Describes the foundations of all NMOS resources'), zod_1.z.object({
    href: zod_1.z.string().url().describe("HTTP access href for the Node's API (deprecated)"),
    hostname: zod_1.z.string().describe('Node hostname (optional, deprecated)').optional(),
    api: zod_1.z
        .object({
        versions: zod_1.z
            .array(zod_1.z.string().regex(new RegExp('v[0-9]+.[0-9]+')))
            .describe('Supported API versions running on this Node'),
        endpoints: zod_1.z
            .array(zod_1.z.object({
            host: zod_1.z
                .union([zod_1.z.any(), zod_1.z.any(), zod_1.z.any()])
                .describe('IP address or hostname which the Node API is running on'),
            port: zod_1.z
                .number()
                .int()
                .gte(1)
                .lte(65535)
                .describe('Port number which the Node API is running on'),
            protocol: zod_1.z
                .enum(['http', 'https'])
                .describe('Protocol supported by this instance of the Node API'),
        }))
            .describe('Host, port and protocol details required to connect to the API'),
    })
        .describe('URL fragments required to connect to the Node API'),
    caps: zod_1.z.record(zod_1.z.any()).describe('Capabilities (not yet defined)'),
    services: zod_1.z
        .array(zod_1.z.object({
        href: zod_1.z.string().url().describe('URL to reach a service running on the Node'),
        type: zod_1.z.string().url().describe('URN identifying the type of service'),
    }))
        .describe('Array of objects containing a URN format type and href'),
    clocks: zod_1.z
        .array(zod_1.z.union([
        zod_1.z
            .object({
            name: zod_1.z
                .string()
                .regex(new RegExp('^clk[0-9]+$'))
                .describe('Name of this refclock (unique for this set of clocks)'),
            ref_type: zod_1.z
                .literal('internal')
                .describe('Type of external reference used by this clock'),
        })
            .describe('Describes a clock with no external reference'),
        zod_1.z
            .object({
            name: zod_1.z
                .string()
                .regex(new RegExp('^clk[0-9]+$'))
                .describe('Name of this refclock (unique for this set of clocks)'),
            ref_type: zod_1.z
                .literal('ptp')
                .describe('Type of external reference used by this clock'),
            traceable: zod_1.z
                .boolean()
                .describe('External refclock is synchronised to International Atomic Time (TAI)'),
            version: zod_1.z
                .literal('IEEE1588-2008')
                .describe('Version of PTP reference used by this clock'),
            gmid: zod_1.z
                .string()
                .regex(new RegExp('^[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}-[0-9a-f]{2}$'))
                .describe('ID of the PTP reference used by this clock'),
            locked: zod_1.z
                .boolean()
                .describe('Lock state of this clock to the external reference. If true, this device is slaved, otherwise it has no defined relationship to the external reference'),
        })
            .describe('Describes a clock referenced to PTP'),
    ]))
        .describe('Clocks made available to Devices owned by this Node'),
})))
    .describe('Describes the Node and the services which run on it');
