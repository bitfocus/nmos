"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .record(zod_1.z.any())
    .and(zod_1.z.any().superRefine((x, ctx) => {
    const schemas = [
        zod_1.z
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
                href: zod_1.z
                    .string()
                    .url()
                    .describe('URL to reach a service running on the Node'),
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
            .describe('Describes the Node and the services which run on it'),
        zod_1.z
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
            type: zod_1.z
                .any()
                .superRefine((x, ctx) => {
                const schemas = [
                    zod_1.z.enum(['urn:x-nmos:device:generic', 'urn:x-nmos:device:pipeline']),
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
                .describe('Device type URN'),
            node_id: zod_1.z
                .string()
                .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                .describe('Globally unique identifier for the Node which initially created the Device. This attribute is used to ensure referential integrity by registry implementations.'),
            senders: zod_1.z
                .array(zod_1.z
                .string()
                .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                .describe('UUIDs of Senders attached to the Device'),
            receivers: zod_1.z
                .array(zod_1.z
                .string()
                .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                .describe('UUIDs of Receivers attached to the Device'),
            controls: zod_1.z
                .array(zod_1.z.object({
                href: zod_1.z
                    .string()
                    .url()
                    .describe('URL to reach a control endpoint, whether http or otherwise'),
                type: zod_1.z.string().url().describe('URN identifying the control format'),
            }))
                .describe('Control endpoints exposed for the Device'),
        })))
            .describe('Describes a Device'),
        zod_1.z
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
                    grain_rate: zod_1.z
                        .object({
                        numerator: zod_1.z.number().int().describe('Numerator'),
                        denominator: zod_1.z
                            .number()
                            .int()
                            .describe('Denominator')
                            .default(1),
                    })
                        .describe('Maximum number of Grains per second for Flows derived from this Source. Corresponding Flow Grain rates may override this attribute. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Sources only.')
                        .optional(),
                    caps: zod_1.z
                        .record(zod_1.z.any())
                        .describe('Capabilities (not yet defined)'),
                    device_id: zod_1.z
                        .string()
                        .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                        .describe('Globally unique identifier for the Device which initially created the Source. This attribute is used to ensure referential integrity by registry implementations.'),
                    parents: zod_1.z
                        .array(zod_1.z
                        .string()
                        .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                        .describe('Array of UUIDs representing the Source IDs of Grains which came together at the input to this Source (may change over the lifetime of this Source)'),
                    clock_name: zod_1.z
                        .union([
                        zod_1.z
                            .string()
                            .regex(new RegExp('^clk[0-9]+$'))
                            .describe('Reference to clock in the originating Node'),
                        zod_1.z
                            .null()
                            .describe('Reference to clock in the originating Node'),
                    ])
                        .describe('Reference to clock in the originating Node'),
                })))
                    .describe('Describes a Source'), zod_1.z.object({
                    format: zod_1.z
                        .enum([
                        'urn:x-nmos:format:video',
                        'urn:x-nmos:format:data',
                        'urn:x-nmos:format:mux',
                    ])
                        .describe('Format of the data coming from the Source as a URN'),
                })))
                    .describe('Describes a generic Source'),
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
                    grain_rate: zod_1.z
                        .object({
                        numerator: zod_1.z.number().int().describe('Numerator'),
                        denominator: zod_1.z
                            .number()
                            .int()
                            .describe('Denominator')
                            .default(1),
                    })
                        .describe('Maximum number of Grains per second for Flows derived from this Source. Corresponding Flow Grain rates may override this attribute. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Sources only.')
                        .optional(),
                    caps: zod_1.z
                        .record(zod_1.z.any())
                        .describe('Capabilities (not yet defined)'),
                    device_id: zod_1.z
                        .string()
                        .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                        .describe('Globally unique identifier for the Device which initially created the Source. This attribute is used to ensure referential integrity by registry implementations.'),
                    parents: zod_1.z
                        .array(zod_1.z
                        .string()
                        .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                        .describe('Array of UUIDs representing the Source IDs of Grains which came together at the input to this Source (may change over the lifetime of this Source)'),
                    clock_name: zod_1.z
                        .union([
                        zod_1.z
                            .string()
                            .regex(new RegExp('^clk[0-9]+$'))
                            .describe('Reference to clock in the originating Node'),
                        zod_1.z
                            .null()
                            .describe('Reference to clock in the originating Node'),
                    ])
                        .describe('Reference to clock in the originating Node'),
                })))
                    .describe('Describes a Source'), zod_1.z.object({
                    format: zod_1.z
                        .literal('urn:x-nmos:format:audio')
                        .describe('Format of the data coming from the Source as a URN'),
                    channels: zod_1.z
                        .array(zod_1.z.object({
                        label: zod_1.z
                            .string()
                            .describe('Label for this channel (free text)'),
                        symbol: zod_1.z
                            .union([
                            zod_1.z.enum([
                                'L',
                                'R',
                                'C',
                                'LFE',
                                'Ls',
                                'Rs',
                                'Lss',
                                'Rss',
                                'Lrs',
                                'Rrs',
                                'Lc',
                                'Rc',
                                'Cs',
                                'HI',
                                'VIN',
                                'M1',
                                'M2',
                                'Lt',
                                'Rt',
                                'Lst',
                                'Rst',
                                'S',
                            ]),
                            zod_1.z
                                .string()
                                .regex(/^NSC(0[0-9][0-9]|1[0-1][0-9]|12[0-8])$/)
                                .describe('Numbered Source Channel'),
                            zod_1.z
                                .string()
                                .regex(/^U(0[1-9]|[1-5][0-9]|6[0-4])$/)
                                .describe('Undefined channel'),
                        ])
                            .describe('Symbol for this channel (from VSF TR-03 Appendix A)'),
                    }))
                        .min(1)
                        .describe('Array of objects describing the audio channels'),
                })))
                    .describe('Describes an audio Source'),
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
            .describe('Describes a Source'),
        zod_1.z
            .record(zod_1.z.any())
            .and(zod_1.z.union([
            zod_1.z
                .record(zod_1.z.any())
                .and(zod_1.z.intersection(zod_1.z
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
                                    path: [
                                        ...ctx.path,
                                        key,
                                    ],
                                    code: 'custom',
                                    message: `Invalid input: Key matching regex /${key}/ must match schema`,
                                    params: {
                                        issues: result.error
                                            .issues,
                                    },
                                });
                            }
                        }
                    }
                })
                    .describe('Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'),
            })
                .describe('Describes the foundations of all NMOS resources'), zod_1.z.object({
                grain_rate: zod_1.z
                    .object({
                    numerator: zod_1.z
                        .number()
                        .int()
                        .describe('Numerator'),
                    denominator: zod_1.z
                        .number()
                        .int()
                        .describe('Denominator')
                        .default(1),
                })
                    .describe('Number of Grains per second for this Flow. Must be an integer division of, or equal to the Grain rate specified by the parent Source. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Flows only.')
                    .optional(),
                source_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Source which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.0 only).'),
                device_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Device which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.1 onwards).'),
                parents: zod_1.z
                    .array(zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                    .describe('Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'),
            })))
                .describe('Describes a Flow'), zod_1.z.object({
                format: zod_1.z
                    .literal('urn:x-nmos:format:video')
                    .describe('Format of the data coming from the Flow as a URN'),
                frame_width: zod_1.z
                    .number()
                    .int()
                    .describe('Width of the picture in pixels'),
                frame_height: zod_1.z
                    .number()
                    .int()
                    .describe('Height of the picture in pixels'),
                interlace_mode: zod_1.z
                    .enum([
                    'progressive',
                    'interlaced_tff',
                    'interlaced_bff',
                    'interlaced_psf',
                ])
                    .describe('Interlaced video mode for frames in this Flow')
                    .default('progressive'),
                colorspace: zod_1.z
                    .enum(['BT601', 'BT709', 'BT2020', 'BT2100'])
                    .describe('Colorspace used for the video'),
                transfer_characteristic: zod_1.z
                    .enum(['SDR', 'HLG', 'PQ'])
                    .describe('Transfer characteristic')
                    .default('SDR'),
            })))
                .describe('Describes a Video Flow'), zod_1.z.object({
                media_type: zod_1.z
                    .literal('video/raw')
                    .describe('Subclassification of the format using IANA assigned media types'),
                components: zod_1.z
                    .array(zod_1.z.object({
                    name: zod_1.z
                        .enum([
                        'Y',
                        'Cb',
                        'Cr',
                        'I',
                        'Ct',
                        'Cp',
                        'A',
                        'R',
                        'G',
                        'B',
                        'DepthMap',
                    ])
                        .describe('Name of this component'),
                    width: zod_1.z
                        .number()
                        .int()
                        .describe('Width of this component in pixels'),
                    height: zod_1.z
                        .number()
                        .int()
                        .describe('Height of this component in pixels'),
                    bit_depth: zod_1.z
                        .number()
                        .int()
                        .describe('Number of bits used to describe each sample'),
                }))
                    .min(1)
                    .describe('Array of objects describing the components'),
            })))
                .describe('Describes a raw Video Flow'),
            zod_1.z
                .record(zod_1.z.any())
                .and(zod_1.z.intersection(zod_1.z
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
                                    path: [
                                        ...ctx.path,
                                        key,
                                    ],
                                    code: 'custom',
                                    message: `Invalid input: Key matching regex /${key}/ must match schema`,
                                    params: {
                                        issues: result.error
                                            .issues,
                                    },
                                });
                            }
                        }
                    }
                })
                    .describe('Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'),
            })
                .describe('Describes the foundations of all NMOS resources'), zod_1.z.object({
                grain_rate: zod_1.z
                    .object({
                    numerator: zod_1.z
                        .number()
                        .int()
                        .describe('Numerator'),
                    denominator: zod_1.z
                        .number()
                        .int()
                        .describe('Denominator')
                        .default(1),
                })
                    .describe('Number of Grains per second for this Flow. Must be an integer division of, or equal to the Grain rate specified by the parent Source. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Flows only.')
                    .optional(),
                source_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Source which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.0 only).'),
                device_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Device which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.1 onwards).'),
                parents: zod_1.z
                    .array(zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                    .describe('Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'),
            })))
                .describe('Describes a Flow'), zod_1.z.object({
                format: zod_1.z
                    .literal('urn:x-nmos:format:video')
                    .describe('Format of the data coming from the Flow as a URN'),
                frame_width: zod_1.z
                    .number()
                    .int()
                    .describe('Width of the picture in pixels'),
                frame_height: zod_1.z
                    .number()
                    .int()
                    .describe('Height of the picture in pixels'),
                interlace_mode: zod_1.z
                    .enum([
                    'progressive',
                    'interlaced_tff',
                    'interlaced_bff',
                    'interlaced_psf',
                ])
                    .describe('Interlaced video mode for frames in this Flow')
                    .default('progressive'),
                colorspace: zod_1.z
                    .enum(['BT601', 'BT709', 'BT2020', 'BT2100'])
                    .describe('Colorspace used for the video'),
                transfer_characteristic: zod_1.z
                    .enum(['SDR', 'HLG', 'PQ'])
                    .describe('Transfer characteristic')
                    .default('SDR'),
            })))
                .describe('Describes a Video Flow'), zod_1.z.object({
                media_type: zod_1.z
                    .union([zod_1.z.enum(['video/H264', 'video/vc2']), zod_1.z.any()])
                    .describe('Subclassification of the format using IANA assigned media types'),
            })))
                .describe('Describes a coded Video Flow'),
            zod_1.z
                .record(zod_1.z.any())
                .and(zod_1.z.intersection(zod_1.z
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
                                    path: [
                                        ...ctx.path,
                                        key,
                                    ],
                                    code: 'custom',
                                    message: `Invalid input: Key matching regex /${key}/ must match schema`,
                                    params: {
                                        issues: result.error
                                            .issues,
                                    },
                                });
                            }
                        }
                    }
                })
                    .describe('Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'),
            })
                .describe('Describes the foundations of all NMOS resources'), zod_1.z.object({
                grain_rate: zod_1.z
                    .object({
                    numerator: zod_1.z
                        .number()
                        .int()
                        .describe('Numerator'),
                    denominator: zod_1.z
                        .number()
                        .int()
                        .describe('Denominator')
                        .default(1),
                })
                    .describe('Number of Grains per second for this Flow. Must be an integer division of, or equal to the Grain rate specified by the parent Source. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Flows only.')
                    .optional(),
                source_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Source which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.0 only).'),
                device_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Device which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.1 onwards).'),
                parents: zod_1.z
                    .array(zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                    .describe('Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'),
            })))
                .describe('Describes a Flow'), zod_1.z.object({
                format: zod_1.z
                    .literal('urn:x-nmos:format:audio')
                    .describe('Format of the data coming from the Flow as a URN'),
                sample_rate: zod_1.z
                    .object({
                    numerator: zod_1.z.number().int().describe('Numerator'),
                    denominator: zod_1.z
                        .number()
                        .int()
                        .describe('Denominator')
                        .default(1),
                })
                    .describe('Number of audio samples per second for this Flow'),
            })))
                .describe('Describes an audio Flow'), zod_1.z.object({
                media_type: zod_1.z
                    .union([
                    zod_1.z.enum(['audio/L24', 'audio/L20', 'audio/L16', 'audio/L8']),
                    zod_1.z.any(),
                ])
                    .describe('Subclassification of the format using IANA assigned media types'),
                bit_depth: zod_1.z.number().int().describe('Bit depth of the audio samples'),
            })))
                .describe('Describes a raw audio Flow'),
            zod_1.z
                .record(zod_1.z.any())
                .and(zod_1.z.intersection(zod_1.z
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
                                    path: [
                                        ...ctx.path,
                                        key,
                                    ],
                                    code: 'custom',
                                    message: `Invalid input: Key matching regex /${key}/ must match schema`,
                                    params: {
                                        issues: result.error
                                            .issues,
                                    },
                                });
                            }
                        }
                    }
                })
                    .describe('Key value set of freeform string tags to aid in filtering resources. Values should be represented as an array of strings. Can be empty.'),
            })
                .describe('Describes the foundations of all NMOS resources'), zod_1.z.object({
                grain_rate: zod_1.z
                    .object({
                    numerator: zod_1.z
                        .number()
                        .int()
                        .describe('Numerator'),
                    denominator: zod_1.z
                        .number()
                        .int()
                        .describe('Denominator')
                        .default(1),
                })
                    .describe('Number of Grains per second for this Flow. Must be an integer division of, or equal to the Grain rate specified by the parent Source. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Flows only.')
                    .optional(),
                source_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Source which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.0 only).'),
                device_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Device which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.1 onwards).'),
                parents: zod_1.z
                    .array(zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                    .describe('Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'),
            })))
                .describe('Describes a Flow'), zod_1.z.object({
                format: zod_1.z
                    .literal('urn:x-nmos:format:audio')
                    .describe('Format of the data coming from the Flow as a URN'),
                sample_rate: zod_1.z
                    .object({
                    numerator: zod_1.z.number().int().describe('Numerator'),
                    denominator: zod_1.z
                        .number()
                        .int()
                        .describe('Denominator')
                        .default(1),
                })
                    .describe('Number of audio samples per second for this Flow'),
            })))
                .describe('Describes an audio Flow'), zod_1.z.object({
                media_type: zod_1.z
                    .any()
                    .refine((value) => !zod_1.z.any().safeParse(value).success, 'Invalid input: Should NOT be valid against schema')
                    .describe('Subclassification of the format using IANA assigned media types'),
            })))
                .describe('Describes a coded audio Flow'),
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
                grain_rate: zod_1.z
                    .object({
                    numerator: zod_1.z.number().int().describe('Numerator'),
                    denominator: zod_1.z
                        .number()
                        .int()
                        .describe('Denominator')
                        .default(1),
                })
                    .describe('Number of Grains per second for this Flow. Must be an integer division of, or equal to the Grain rate specified by the parent Source. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Flows only.')
                    .optional(),
                source_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Source which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.0 only).'),
                device_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Device which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.1 onwards).'),
                parents: zod_1.z
                    .array(zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                    .describe('Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'),
            })))
                .describe('Describes a Flow'), zod_1.z.object({
                format: zod_1.z
                    .literal('urn:x-nmos:format:data')
                    .describe('Format of the data coming from the Flow as a URN'),
                media_type: zod_1.z
                    .any()
                    .refine((value) => !zod_1.z.literal('video/smpte291').safeParse(value).success, 'Invalid input: Should NOT be valid against schema')
                    .describe('Subclassification of the format using IANA assigned media types'),
            })))
                .describe('Describes a generic data Flow'),
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
                grain_rate: zod_1.z
                    .object({
                    numerator: zod_1.z.number().int().describe('Numerator'),
                    denominator: zod_1.z
                        .number()
                        .int()
                        .describe('Denominator')
                        .default(1),
                })
                    .describe('Number of Grains per second for this Flow. Must be an integer division of, or equal to the Grain rate specified by the parent Source. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Flows only.')
                    .optional(),
                source_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Source which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.0 only).'),
                device_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Device which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.1 onwards).'),
                parents: zod_1.z
                    .array(zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                    .describe('Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'),
            })))
                .describe('Describes a Flow'), zod_1.z.object({
                format: zod_1.z
                    .literal('urn:x-nmos:format:data')
                    .describe('Format of the data coming from the Flow as a URN'),
                media_type: zod_1.z
                    .literal('video/smpte291')
                    .describe('Subclassification of the format using IANA assigned media types'),
                DID_SDID: zod_1.z
                    .array(zod_1.z.object({
                    DID: zod_1.z
                        .string()
                        .regex(new RegExp('^0x[0-9a-fA-F]{2}$'))
                        .describe('Data identification word')
                        .optional(),
                    SDID: zod_1.z
                        .string()
                        .regex(new RegExp('^0x[0-9a-fA-F]{2}$'))
                        .describe('Secondary data identification word')
                        .optional(),
                }))
                    .describe('List of Data identification and Secondary data identification words')
                    .optional(),
            })))
                .describe('Describes an SDI ancillary Flow'),
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
                grain_rate: zod_1.z
                    .object({
                    numerator: zod_1.z.number().int().describe('Numerator'),
                    denominator: zod_1.z
                        .number()
                        .int()
                        .describe('Denominator')
                        .default(1),
                })
                    .describe('Number of Grains per second for this Flow. Must be an integer division of, or equal to the Grain rate specified by the parent Source. Grain rate matches the frame rate for video (see NMOS Content Model). Specified for periodic Flows only.')
                    .optional(),
                source_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Source which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.0 only).'),
                device_id: zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('Globally unique identifier for the Device which initially created the Flow. This attribute is used to ensure referential integrity by registry implementations (v1.1 onwards).'),
                parents: zod_1.z
                    .array(zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')))
                    .describe('Array of UUIDs representing the Flow IDs of Grains which came together to generate this Flow (may change over the lifetime of this Flow)'),
            })))
                .describe('Describes a Flow'), zod_1.z.object({
                format: zod_1.z
                    .literal('urn:x-nmos:format:mux')
                    .describe('Format of the data coming from the Flow as a URN'),
                media_type: zod_1.z
                    .union([zod_1.z.literal('video/SMPTE2022-6'), zod_1.z.any()])
                    .describe('Subclassification of the format using IANA assigned media types'),
            })))
                .describe('Describes a mux Flow'),
        ]))
            .describe('Describes a Flow'),
        zod_1.z
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
            flow_id: zod_1.z
                .union([
                zod_1.z
                    .string()
                    .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                    .describe('ID of the Flow currently passing via this Sender'),
                zod_1.z
                    .null()
                    .describe('ID of the Flow currently passing via this Sender')
                    .default(null),
            ])
                .describe('ID of the Flow currently passing via this Sender')
                .default(null),
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
                .describe('Transport type used by the Sender in URN format'),
            device_id: zod_1.z
                .string()
                .regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
                .describe('Device ID which this Sender forms part of. This attribute is used to ensure referential integrity by registry implementations.'),
            manifest_href: zod_1.z
                .string()
                .url()
                .describe('HTTP URL to a file describing how to connect to the Sender (SDP for RTP)'),
        })))
            .describe('Describes a sender'),
        zod_1.z
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
                                .describe('UUID of the Sender that this Receiver is currently subscribed to'),
                        ])
                            .describe('UUID of the Sender that this Receiver is currently subscribed to')
                            .default(null),
                    })
                        .describe("Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation."),
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
                                .describe('UUID of the Sender that this Receiver is currently subscribed to'),
                        ])
                            .describe('UUID of the Sender that this Receiver is currently subscribed to')
                            .default(null),
                    })
                        .describe("Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation."),
                })))
                    .describe('Describes a receiver'), zod_1.z.object({
                    format: zod_1.z
                        .literal('urn:x-nmos:format:audio')
                        .describe('Type of Flow accepted by the Receiver as a URN'),
                    caps: zod_1.z
                        .object({
                        media_types: zod_1.z
                            .array(zod_1.z.union([
                            zod_1.z.enum([
                                'audio/L24',
                                'audio/L20',
                                'audio/L16',
                                'audio/L8',
                            ]),
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
                                .describe('UUID of the Sender that this Receiver is currently subscribed to'),
                        ])
                            .describe('UUID of the Sender that this Receiver is currently subscribed to')
                            .default(null),
                    })
                        .describe("Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation."),
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
                                .describe('UUID of the Sender that this Receiver is currently subscribed to'),
                        ])
                            .describe('UUID of the Sender that this Receiver is currently subscribed to')
                            .default(null),
                    })
                        .describe("Object containing the 'sender_id' currently subscribed to. Sender_id should be null on initialisation."),
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
            .describe('Describes a Receiver'),
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
    .describe('Returning a registered resource from the Registration API');
