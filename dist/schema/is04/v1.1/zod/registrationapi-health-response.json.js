"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    health: zod_1.z
        .string()
        .regex(new RegExp('^[0-9]+$'))
        .describe('Timestamp indicating the time in seconds at which the server recorded the heartbeat'),
})
    .describe("Response to a request to update a resource's health");
