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
        }, "strip", z.ZodTypeAny, {
            port: number;
            protocol: "http" | "https";
            host?: any;
        }, {
            port: number;
            protocol: "http" | "https";
            host?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        versions: string[];
        endpoints: {
            port: number;
            protocol: "http" | "https";
            host?: any;
        }[];
    }, {
        versions: string[];
        endpoints: {
            port: number;
            protocol: "http" | "https";
            host?: any;
        }[];
    }>;
    caps: z.ZodRecord<z.ZodString, z.ZodAny>;
    services: z.ZodArray<z.ZodObject<{
        href: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        href: string;
    }, {
        type: string;
        href: string;
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
    }, "strip", z.ZodTypeAny, {
        name: string;
        chassis_id: string | null;
        port_id: string;
    }, {
        name: string;
        chassis_id: string | null;
        port_id: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    href: string;
    api: {
        versions: string[];
        endpoints: {
            port: number;
            protocol: "http" | "https";
            host?: any;
        }[];
    };
    caps: Record<string, any>;
    services: {
        type: string;
        href: string;
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
        }[];
    };
    caps: Record<string, any>;
    services: {
        type: string;
        href: string;
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
    }[];
    hostname?: string | undefined;
}>>>;
export default _default;
