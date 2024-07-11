"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_1 = __importDefault(require("./zod/node.json"));
const devices_json_1 = __importDefault(require("./zod/devices.json"));
const device_json_1 = __importDefault(require("./zod/device.json"));
const senders_json_1 = __importDefault(require("./zod/senders.json"));
const sender_json_1 = __importDefault(require("./zod/sender.json"));
const receivers_json_1 = __importDefault(require("./zod/receivers.json"));
const receiver_json_1 = __importDefault(require("./zod/receiver.json"));
const sources_json_1 = __importDefault(require("./zod/sources.json"));
const source_json_1 = __importDefault(require("./zod/source.json"));
const flows_json_1 = __importDefault(require("./zod/flows.json"));
const flow_json_1 = __importDefault(require("./zod/flow.json"));
exports.default = {
    '/node/v1.3/self': node_json_1.default,
    '/node/v1.3/devices': devices_json_1.default,
    '/node/v1.3/devices/{device_id}': device_json_1.default,
    '/node/v1.3/senders': senders_json_1.default,
    '/node/v1.3/senders/{sender_id}': sender_json_1.default,
    '/node/v1.3/receivers': receivers_json_1.default,
    '/node/v1.3/receivers/{receiver_id}': receiver_json_1.default,
    '/node/v1.3/sources': sources_json_1.default,
    '/node/v1.3/sources/{source_id}': source_json_1.default,
    '/node/v1.3/flows': flows_json_1.default,
    '/node/v1.3/flows/{flow_id}': flow_json_1.default,
};
