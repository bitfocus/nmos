import { NMOSRuntimeOptions } from './types';
import { endpoints } from './schema';
import { z } from 'zod';
type Endpoints = typeof endpoints;
export type EndpointTypes = keyof typeof endpoints;
export type EndpointType<T extends EndpointTypes> = z.infer<Endpoints[T]>;
export declare class NMOSRuntime {
    private runtime;
    constructor(options: NMOSRuntimeOptions);
    get<T extends EndpointTypes>(path: T, options?: Record<string, string>): Promise<EndpointType<T> | undefined>;
}
export declare class NMOS extends NMOSRuntime {
    constructor({ dialect, protocol, host, port, basePath, }: Partial<NMOSRuntimeOptions>);
}
export {};
