"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .array(zod_1.z.enum(['resource/', 'health/']))
    .min(2)
    .max(2)
    .describe('Describes the Registration API base resource');
