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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NMOS = exports.NMOSRuntime = void 0;
const axios_1 = require("axios");
const schema_1 = require("../schema");
class NMOSRuntime {
    constructor(options) {
        this.runtime = new axios_1.Axios({
            baseURL: `${options.protocol}://${options.host}:${options.port}${options.basePath}`,
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    get(path_1) {
        return __awaiter(this, arguments, void 0, function* (path, options = {}) {
            const endpoint = schema_1.endpoints[path];
            const resolvedPath = path.replace(/{([^}]*)}/g, (_, key) => options[key]);
            const result = yield this.runtime.get(resolvedPath);
            if (result.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            try {
                if (typeof result.data === 'string') {
                    try {
                        result.data = JSON.parse(result.data);
                    }
                    catch (error) {
                        console.error(error);
                        throw new Error('Failed to parse response');
                    }
                }
                if (yield endpoint.parseAsync(result.data)) {
                    console.log('Valid');
                }
                else {
                    console.log('Not valid');
                }
                return result.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.NMOSRuntime = NMOSRuntime;
class NMOS extends NMOSRuntime {
    constructor({ dialect = null, protocol = 'http', host = '127.0.0.1', port = 80, basePath = '/x-nmos', }) {
        super({
            dialect,
            protocol,
            host,
            port,
            basePath,
        });
    }
}
exports.NMOS = NMOS;
