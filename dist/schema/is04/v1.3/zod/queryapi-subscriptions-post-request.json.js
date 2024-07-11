"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    max_update_rate_ms: zod_1.z
        .number()
        .int()
        .describe('Rate limiting for messages. Sets the minimum interval (in milliseconds) between consecutive WebSocket messages.')
        .default(100),
    persist: zod_1.z
        .boolean()
        .describe('Whether the API will retain or destroy the subscription after the final client disconnects')
        .default(false),
    secure: zod_1.z
        .boolean()
        .describe("Whether a secure WebSocket connection (wss://) is required. NB: Default should be 'true' if the API is being presented via HTTPS, and 'false' otherwise.")
        .optional(),
    resource_path: zod_1.z
        .enum(['/nodes', '/devices', '/sources', '/flows', '/senders', '/receivers'])
        .describe('HTTP resource path in the Query API to which this subscription relates'),
    params: zod_1.z
        .record(zod_1.z.any())
        .describe('Object containing attributes to filter the resource on as per the Query Parameters specification. Can be empty.'),
    authorization: zod_1.z
        .boolean()
        .describe("Whether the WebSocket connection requires authorization. NB: Default should be 'true' if the API requires authorization, and 'false' otherwise.")
        .optional(),
})
    .describe('Create a new subscription to a Query API');
