"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .array(zod_1.z
    .record(zod_1.z.any())
    .and(zod_1.z.any().superRefine((x, ctx) => {
    const schemas = [
        zod_1.z
            .record(zod_1.z.any())
            .and(zod_1.z.intersection(zod_1.z
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
            label: zod_1.z
                .string()
                .describe('Freeform string label for the resource'),
            description: zod_1.z
                .string()
                .describe('Detailed description of the resource'),
            tags: zod_1.z
                .record(zod_1.z.array(zod_1.z.string()))
                .superRefine((value, ctx) => {
                for (const key in value) {
                    if (key.match(new RegExp(''))) {
                        const result = zod_1.z
                            .array(zod_1.z.string())
                            .safeParse(value[key]);
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
                    zod_1.z.enum([
                        'urn:x-nmos:transport:rtp',
                        'urn:x-nmos:transport:rtp.ucast',
                        'urn:x-nmos:transport:rtp.mcast',
                        'urn:x-nmos:transport:dash',
                    ]),
                    zod_1.z
                        .any()
                        .refine((value) => !zod_1.z.any().safeParse(value).success, 'Invalid input: Should NOT be valid against schema'),
                ];
                const errors = schemas.reduce((errors, schema) => ((result) => result.error
                    ? [...errors, result.error]
                    : errors)(schema.safeParse(x)), []);
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
                .describe("Binding of Receiver ingress ports to interfaces on the parent Node. Should contain a single network interface unless a redundancy mechanism such as ST.2022-7 is in use, in which case each 'leg' should have its matching interface listed. Where the redundancy mechanism receives more than one copy of the stream via the same interface, that interface should be listed a corresponding number of times."),
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
                active: zod_1.z
                    .boolean()
                    .describe("Receiver is enabled and configured with a Sender's connection parameters")
                    .default(false),
            })
                .describe("Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation, or when connected to a non-NMOS Sender."),
        })))
            .describe('Describes a receiver'), zod_1.z.object({
            format: zod_1.z
                .literal('urn:x-nmos:format:video')
                .describe('Type of Flow accepted by the Receiver as a URN'),
            caps: zod_1.z
                .object({
                media_types: zod_1.z
                    .array(zod_1.z.union([
                    zod_1.z.enum(['video/raw', 'video/H264', 'video/vc2']),
                    zod_1.z.any(),
                ]))
                    .min(1)
                    .describe('Subclassification of the formats accepted using IANA assigned media types')
                    .optional(),
            })
                .describe('Capabilities'),
        })))
            .describe('Describes a video Receiver'),
        zod_1.z
            .record(zod_1.z.any())
            .and(zod_1.z.intersection(zod_1.z
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
            label: zod_1.z
                .string()
                .describe('Freeform string label for the resource'),
            description: zod_1.z
                .string()
                .describe('Detailed description of the resource'),
            tags: zod_1.z
                .record(zod_1.z.array(zod_1.z.string()))
                .superRefine((value, ctx) => {
                for (const key in value) {
                    if (key.match(new RegExp(''))) {
                        const result = zod_1.z
                            .array(zod_1.z.string())
                            .safeParse(value[key]);
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
                    zod_1.z.enum([
                        'urn:x-nmos:transport:rtp',
                        'urn:x-nmos:transport:rtp.ucast',
                        'urn:x-nmos:transport:rtp.mcast',
                        'urn:x-nmos:transport:dash',
                    ]),
                    zod_1.z
                        .any()
                        .refine((value) => !zod_1.z.any().safeParse(value).success, 'Invalid input: Should NOT be valid against schema'),
                ];
                const errors = schemas.reduce((errors, schema) => ((result) => result.error
                    ? [...errors, result.error]
                    : errors)(schema.safeParse(x)), []);
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
                .describe("Binding of Receiver ingress ports to interfaces on the parent Node. Should contain a single network interface unless a redundancy mechanism such as ST.2022-7 is in use, in which case each 'leg' should have its matching interface listed. Where the redundancy mechanism receives more than one copy of the stream via the same interface, that interface should be listed a corresponding number of times."),
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
                active: zod_1.z
                    .boolean()
                    .describe("Receiver is enabled and configured with a Sender's connection parameters")
                    .default(false),
            })
                .describe("Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation, or when connected to a non-NMOS Sender."),
        })))
            .describe('Describes a receiver'), zod_1.z.object({
            format: zod_1.z
                .literal('urn:x-nmos:format:audio')
                .describe('Type of Flow accepted by the Receiver as a URN'),
            caps: zod_1.z
                .object({
                media_types: zod_1.z
                    .array(zod_1.z.union([
                    zod_1.z.enum(['audio/L24', 'audio/L20', 'audio/L16', 'audio/L8']),
                    zod_1.z.any(),
                ]))
                    .min(1)
                    .describe('Subclassification of the formats accepted using IANA assigned media types')
                    .optional(),
            })
                .describe('Capabilities'),
        })))
            .describe('Describes an audio Receiver'),
        zod_1.z
            .record(zod_1.z.any())
            .and(zod_1.z.intersection(zod_1.z
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
            label: zod_1.z
                .string()
                .describe('Freeform string label for the resource'),
            description: zod_1.z
                .string()
                .describe('Detailed description of the resource'),
            tags: zod_1.z
                .record(zod_1.z.array(zod_1.z.string()))
                .superRefine((value, ctx) => {
                for (const key in value) {
                    if (key.match(new RegExp(''))) {
                        const result = zod_1.z
                            .array(zod_1.z.string())
                            .safeParse(value[key]);
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
                    zod_1.z.enum([
                        'urn:x-nmos:transport:rtp',
                        'urn:x-nmos:transport:rtp.ucast',
                        'urn:x-nmos:transport:rtp.mcast',
                        'urn:x-nmos:transport:dash',
                    ]),
                    zod_1.z
                        .any()
                        .refine((value) => !zod_1.z.any().safeParse(value).success, 'Invalid input: Should NOT be valid against schema'),
                ];
                const errors = schemas.reduce((errors, schema) => ((result) => result.error
                    ? [...errors, result.error]
                    : errors)(schema.safeParse(x)), []);
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
                .describe("Binding of Receiver ingress ports to interfaces on the parent Node. Should contain a single network interface unless a redundancy mechanism such as ST.2022-7 is in use, in which case each 'leg' should have its matching interface listed. Where the redundancy mechanism receives more than one copy of the stream via the same interface, that interface should be listed a corresponding number of times."),
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
                active: zod_1.z
                    .boolean()
                    .describe("Receiver is enabled and configured with a Sender's connection parameters")
                    .default(false),
            })
                .describe("Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation, or when connected to a non-NMOS Sender."),
        })))
            .describe('Describes a receiver'), zod_1.z.object({
            format: zod_1.z
                .literal('urn:x-nmos:format:data')
                .describe('Type of Flow accepted by the Receiver as a URN'),
            caps: zod_1.z
                .object({
                media_types: zod_1.z
                    .array(zod_1.z.union([zod_1.z.literal('video/smpte291'), zod_1.z.any()]))
                    .min(1)
                    .describe('Subclassification of the formats accepted using IANA assigned media types')
                    .optional(),
            })
                .describe('Capabilities'),
        })))
            .describe('Describes a data Receiver'),
        zod_1.z
            .record(zod_1.z.any())
            .and(zod_1.z.intersection(zod_1.z
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
            label: zod_1.z
                .string()
                .describe('Freeform string label for the resource'),
            description: zod_1.z
                .string()
                .describe('Detailed description of the resource'),
            tags: zod_1.z
                .record(zod_1.z.array(zod_1.z.string()))
                .superRefine((value, ctx) => {
                for (const key in value) {
                    if (key.match(new RegExp(''))) {
                        const result = zod_1.z
                            .array(zod_1.z.string())
                            .safeParse(value[key]);
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
                    zod_1.z.enum([
                        'urn:x-nmos:transport:rtp',
                        'urn:x-nmos:transport:rtp.ucast',
                        'urn:x-nmos:transport:rtp.mcast',
                        'urn:x-nmos:transport:dash',
                    ]),
                    zod_1.z
                        .any()
                        .refine((value) => !zod_1.z.any().safeParse(value).success, 'Invalid input: Should NOT be valid against schema'),
                ];
                const errors = schemas.reduce((errors, schema) => ((result) => result.error
                    ? [...errors, result.error]
                    : errors)(schema.safeParse(x)), []);
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
                .describe("Binding of Receiver ingress ports to interfaces on the parent Node. Should contain a single network interface unless a redundancy mechanism such as ST.2022-7 is in use, in which case each 'leg' should have its matching interface listed. Where the redundancy mechanism receives more than one copy of the stream via the same interface, that interface should be listed a corresponding number of times."),
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
                active: zod_1.z
                    .boolean()
                    .describe("Receiver is enabled and configured with a Sender's connection parameters")
                    .default(false),
            })
                .describe("Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation, or when connected to a non-NMOS Sender."),
        })))
            .describe('Describes a receiver'), zod_1.z.object({
            format: zod_1.z
                .literal('urn:x-nmos:format:mux')
                .describe('Type of Flow accepted by the Receiver as a URN'),
            caps: zod_1.z
                .object({
                media_types: zod_1.z
                    .array(zod_1.z.union([zod_1.z.literal('video/SMPTE2022-6'), zod_1.z.any()]))
                    .min(1)
                    .describe('Subclassification of the formats accepted using IANA assigned media types')
                    .optional(),
            })
                .describe('Capabilities'),
        })))
            .describe('Describes a mux Receiver'),
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
}))
    .describe('Describes a Receiver'))
    .min(0)
    .describe('A list of Receiver resources');
