"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .array(zod_1.z.enum(['nodes/', 'sources/', 'flows/', 'devices/', 'senders/', 'receivers/', 'subscriptions/']))
    .describe('Describes the Query API base resource');
