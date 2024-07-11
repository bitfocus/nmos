"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nmos_1 = __importDefault(require("@bitfocus/nmos"));
const nmos = new nmos_1.default({
    protocol: 'http',
    host: '10.0.0.3',
    port: 8090,
    basePath: '/x-nmos'
})(() => __awaiter(void 0, void 0, void 0, function* () {
    // Get self/node
    const node = yield nmos.get('/node/v1.3/self');
    console.log(node);
    // Get a specific device
    const device = yield nmos.get('/node/v1.3/devices/{device_id}', { devicd_id: "578aa0b3-992d-5ce0-9b4b-1d7b9713c4f2" });
    console.log(device);
}))();
