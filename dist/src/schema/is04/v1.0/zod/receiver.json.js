"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    id: zod_1.z
        .string()
        .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
        .describe('Globally unique identifier for the Receiver'),
    version: zod_1.z
        .string()
        .regex(new RegExp('^[0-9]+:[0-9]+$'))
        .describe('String formatted TAI timestamp (<seconds>:<nanoseconds>) indicating precisely when an attribute of the resource last changed'),
    label: zod_1.z.string().describe('Freeform string label for the Receiver'),
    description: zod_1.z.string().describe('Detailed description of the Receiver'),
    format: zod_1.z
        .enum(['urn:x-nmos:format:video', 'urn:x-nmos:format:audio', 'urn:x-nmos:format:data'])
        .describe('Type of Flow accepted by the Receiver as a URN'),
    caps: zod_1.z.record(zod_1.z.any()).describe('Capabilities (not yet defined)'),
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
        .describe('Key value set of freeform string tags to aid in filtering sources. Values should be represented as an array of strings. Can be empty.'),
    device_id: zod_1.z
        .string()
        .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
        .describe('Device ID which this Receiver forms part of'),
    transport: zod_1.z
        .enum([
        'urn:x-nmos:transport:rtp',
        'urn:x-nmos:transport:rtp.ucast',
        'urn:x-nmos:transport:rtp.mcast',
        'urn:x-nmos:transport:dash',
    ])
        .describe('Transport type accepted by the Receiver in URN format'),
    subscription: zod_1.z
        .object({
        sender_id: zod_1.z
            .union([
            zod_1.z
                .string()
                .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                .describe('UUID of the Sender that this Receiver is currently subscribed to'),
            zod_1.z
                .null()
                .describe('UUID of the Sender that this Receiver is currently subscribed to')
                .default(null),
        ])
            .describe('UUID of the Sender that this Receiver is currently subscribed to')
            .default(null),
    })
        .describe("Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation."),
})
    .describe('Describes a receiver');
