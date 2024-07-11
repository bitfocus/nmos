"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    max_update_rate_ms: zod_1.z
        .number()
        .int()
        .describe('Rate limiting for messages. Sets the minimum interval between consecutive websocket messages')
        .default(100),
    persist: zod_1.z.boolean().describe('Whether to destroy the socket when the final client disconnects').default(false),
    resource_path: zod_1.z
        .enum(['/nodes', '/devices', '/sources', '/flows', '/senders', '/receivers'])
        .describe('HTTP resource path in the query API which this subscription relates to'),
    params: zod_1.z
        .record(zod_1.z.any())
        .describe('Object containing attributes to filter the resource on as per the Query Parameters specification. Can be empty.'),
})
    .describe('Register a new resource or update an existing resource');
