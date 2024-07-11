import { z } from 'zod';
declare const _default: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    version: z.ZodString;
    label: z.ZodString;
    description: z.ZodString;
    tags: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    version: string;
    label: string;
    description: string;
    tags: Record<string, string[]>;
}, {
    id: string;
    version: string;
    label: string;
    description: string;
    tags: Record<string, string[]>;
}>, z.ZodObject<{
    href: z.ZodString;
    hostname: z.ZodOptional<z.ZodString>;
    api: z.ZodObject<{
        versions: z.ZodArray<z.ZodString, "many">;
        endpoints: z.ZodArray<z.ZodObject<{
            host: z.ZodUnion<[z.ZodAny, z.ZodAny, z.ZodAny]>;
            port: z.ZodNumber;
            protocol: z.ZodEnum<["http", "https"]>;
            authorization: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            port: number;
            protocol: "http" | "https";
            authorization: boolean;
            host?: any;
        }, {
            port: number;
            protocol: "http" | "https";
            host?: any;
            authorization?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        versions: string[];
        endpoints: {
            port: number;
            protocol: "http" | "https";
            authorization: boolean;
            host?: any;
        }[];
    }, {
        versions: string[];
        endpoints: {
            port: number;
            protocol: "http" | "https";
            host?: any;
            authorization?: boolean | undefined;
        }[];
    }>;
    caps: z.ZodRecord<z.ZodString, z.ZodAny>;
    services: z.ZodArray<z.ZodObject<{
        href: z.ZodString;
        type: z.ZodString;
        authorization: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        href: string;
        authorization: boolean;
    }, {
        type: string;
        href: string;
        authorization?: boolean | undefined;
    }>, "many">;
    clocks: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        name: z.ZodString;
        ref_type: z.ZodLiteral<"internal">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        ref_type: "internal";
    }, {
        name: string;
        ref_type: "internal";
    }>, z.ZodObject<{
        name: z.ZodString;
        ref_type: z.ZodLiteral<"ptp">;
        traceable: z.ZodBoolean;
        version: z.ZodLiteral<"IEEE1588-2008">;
        gmid: z.ZodString;
        locked: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        version: "IEEE1588-2008";
        name: string;
        ref_type: "ptp";
        traceable: boolean;
        gmid: string;
        locked: boolean;
    }, {
        version: "IEEE1588-2008";
        name: string;
        ref_type: "ptp";
        traceable: boolean;
        gmid: string;
        locked: boolean;
    }>]>, "many">;
    interfaces: z.ZodArray<z.ZodObject<{
        chassis_id: z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNull]>;
        port_id: z.ZodString;
        name: z.ZodString;
        attached_network_device: z.ZodOptional<z.ZodObject<{
            chassis_id: z.ZodUnion<[z.ZodString, z.ZodString]>;
            port_id: z.ZodUnion<[z.ZodString, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            chassis_id: string;
            port_id: string;
        }, {
            chassis_id: string;
            port_id: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        chassis_id: string | null;
        port_id: string;
        attached_network_device?: {
            chassis_id: string;
            port_id: string;
        } | undefined;
    }, {
        name: string;
        chassis_id: string | null;
        port_id: string;
        attached_network_device?: {
            chassis_id: string;
            port_id: string;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    href: string;
    api: {
        versions: string[];
        endpoints: {
            port: number;
            protocol: "http" | "https";
            authorization: boolean;
            host?: any;
        }[];
    };
    caps: Record<string, any>;
    services: {
        type: string;
        href: string;
        authorization: boolean;
    }[];
    clocks: ({
        name: string;
        ref_type: "internal";
    } | {
        version: "IEEE1588-2008";
        name: string;
        ref_type: "ptp";
        traceable: boolean;
        gmid: string;
        locked: boolean;
    })[];
    interfaces: {
        name: string;
        chassis_id: string | null;
        port_id: string;
        attached_network_device?: {
            chassis_id: string;
            port_id: string;
        } | undefined;
    }[];
    hostname?: string | undefined;
}, {
    href: string;
    api: {
        versions: string[];
        endpoints: {
            port: number;
            protocol: "http" | "https";
            host?: any;
            authorization?: boolean | undefined;
        }[];
    };
    caps: Record<string, any>;
    services: {
        type: string;
        href: string;
        authorization?: boolean | undefined;
    }[];
    clocks: ({
        name: string;
        ref_type: "internal";
    } | {
        version: "IEEE1588-2008";
        name: string;
        ref_type: "ptp";
        traceable: boolean;
        gmid: string;
        locked: boolean;
    })[];
    interfaces: {
        name: string;
        chassis_id: string | null;
        port_id: string;
        attached_network_device?: {
            chassis_id: string;
            port_id: string;
        } | undefined;
    }[];
    hostname?: string | undefined;
}>>>;
export default _default;
