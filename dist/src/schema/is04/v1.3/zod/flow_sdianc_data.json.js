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
    .describe('Describes an SDI ancillary Flow');
