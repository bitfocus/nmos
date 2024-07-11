"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    code: zod_1.z.number().int().gte(400).lte(599).describe('HTTP error code'),
    error: zod_1.z
        .string()
        .describe('Human readable message which is suitable for user interface display, and helpful to the user'),
    debug: zod_1.z
        .union([
        zod_1.z.null().describe('Debug information which may assist a programmer working with the API'),
        zod_1.z.string().describe('Debug information which may assist a programmer working with the API'),
    ])
        .describe('Debug information which may assist a programmer working with the API'),
})
    .describe('Describes the standard error response which is returned with HTTP codes 400 and above');
