"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
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
    grain_rate: zod_1.z
        .object({
        numerator: zod_1.z.number().int().describe('Numerator'),
        denominator: zod_1.z.number().int().describe('Denominator').default(1),
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
    frame_width: zod_1.z.number().int().describe('Width of the picture in pixels'),
    frame_height: zod_1.z.number().int().describe('Height of the picture in pixels'),
    interlace_mode: zod_1.z
        .enum(['progressive', 'interlaced_tff', 'interlaced_bff', 'interlaced_psf'])
        .describe('Interlaced video mode for frames in this Flow')
        .default('progressive'),
    colorspace: zod_1.z
        .union([zod_1.z.enum(['BT601', 'BT709', 'BT2020', 'BT2100']), zod_1.z.any()])
        .describe('Colorspace used for the video. Any values not defined in the enum should be defined in the NMOS Parameter Registers'),
    transfer_characteristic: zod_1.z
        .union([zod_1.z.enum(['SDR', 'HLG', 'PQ']), zod_1.z.any()])
        .describe('Transfer characteristic. Any values not defined in the enum should be defined in the NMOS Parameter Registers')
        .default('SDR'),
})))
    .describe('Describes a Video Flow');
