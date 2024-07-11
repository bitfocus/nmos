export type NMOSDialect = null | 'test';
export type NMOSRuntimeOptions = {
    protocol: 'http' | 'https';
    host: string;
    port: number;
    basePath: string;
    dialect: NMOSDialect;
    strict: boolean;
};
