"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .array(zod_1.z.enum(['self/', 'sources/', 'flows/', 'devices/', 'senders/', 'receivers/']))
    .describe('Describes the Node API base resource');
