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
    device_id: zod_1.z
        .string()
        .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
        .describe('Device ID which this Receiver forms part of. This attribute is used to ensure referential integrity by registry implementations.'),
    transport: zod_1.z
        .any()
        .superRefine((x, ctx) => {
        const schemas = [
            zod_1.z.any(),
            zod_1.z
                .any()
                .refine((value) => !zod_1.z.any().safeParse(value).success, 'Invalid input: Should NOT be valid against schema'),
        ];
        const errors = schemas.reduce((errors, schema) => ((result) => (result.error ? [...errors, result.error] : errors))(schema.safeParse(x)), []);
        if (schemas.length - errors.length !== 1) {
            ctx.addIssue({
                path: ctx.path,
                code: 'invalid_union',
                unionErrors: errors,
                message: 'Invalid input: Should pass single schema',
            });
        }
    })
        .describe('Transport type accepted by the Receiver in URN format'),
    interface_bindings: zod_1.z
        .array(zod_1.z.string())
        .describe('Binding of Receiver ingress ports to interfaces on the parent Node.'),
    subscription: zod_1.z
        .object({
        sender_id: zod_1.z
            .union([
            zod_1.z
                .string()
                .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                .describe('UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.'),
            zod_1.z
                .null()
                .describe('UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.')
                .default(null),
        ])
            .describe('UUID of the Sender from which this Receiver is currently configured to receive data. Only set if it is active and receiving from an NMOS Sender; otherwise null.')
            .default(null),
        active: zod_1.z
            .boolean()
            .describe('Receiver is enabled and configured to receive data')
            .default(false),
    })
        .describe('Object indicating how this Receiver is currently configured to receive data.'),
})))
    .describe('Describes a receiver');
