"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    id: zod_1.z
        .string()
        .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
        .describe('Globally unique identifier for the Node'),
    version: zod_1.z
        .string()
        .regex(new RegExp('^[0-9]+:[0-9]+$'))
        .describe('String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'),
    label: zod_1.z.string().describe('Freeform string label for the Node'),
    href: zod_1.z.string().url().describe("HTTP access href for the Node's API"),
    hostname: zod_1.z.string().describe('Node hostname (optional)').optional(),
    caps: zod_1.z.record(zod_1.z.any()).describe('Capabilities (not yet defined)'),
    services: zod_1.z
        .array(zod_1.z.object({
        href: zod_1.z.string().url().describe('URL to reach a service running on the Node'),
        type: zod_1.z.string().url().describe('URN identifying the type of service'),
    }))
        .describe('Array of objects containing a URN format type and href'),
})
    .describe('Describes the Node and the services which run on it');
