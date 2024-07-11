export declare const endpoints: {
    '/node/v1.0/self': import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        href: import("zod").ZodString;
        hostname: import("zod").ZodOptional<import("zod").ZodString>;
        caps: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
        services: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        version: string;
        label: string;
        caps: Record<string, any>;
        href: string;
        services: {
            type: string;
            href: string;
        }[];
        hostname?: string | undefined;
    }, {
        id: string;
        version: string;
        label: string;
        caps: Record<string, any>;
        href: string;
        services: {
            type: string;
            href: string;
        }[];
        hostname?: string | undefined;
    }>;
    '/node/v1.0/devices': import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        type: import("zod").ZodString;
        node_id: import("zod").ZodString;
        senders: import("zod").ZodArray<import("zod").ZodString, "many">;
        receivers: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        type: string;
        id: string;
        version: string;
        label: string;
        node_id: string;
        senders: string[];
        receivers: string[];
    }, {
        type: string;
        id: string;
        version: string;
        label: string;
        node_id: string;
        senders: string[];
        receivers: string[];
    }>, "many">;
    '/node/v1.0/devices/{device_id}': import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        type: import("zod").ZodString;
        node_id: import("zod").ZodString;
        senders: import("zod").ZodArray<import("zod").ZodString, "many">;
        receivers: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        type: string;
        id: string;
        version: string;
        label: string;
        node_id: string;
        senders: string[];
        receivers: string[];
    }, {
        type: string;
        id: string;
        version: string;
        label: string;
        node_id: string;
        senders: string[];
        receivers: string[];
    }>;
    '/node/v1.0/senders': import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        flow_id: import("zod").ZodString;
        transport: import("zod").ZodEnum<["urn:x-nmos:transport:rtp", "urn:x-nmos:transport:rtp.ucast", "urn:x-nmos:transport:rtp.mcast", "urn:x-nmos:transport:dash"]>;
        tags: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>>;
        device_id: import("zod").ZodString;
        manifest_href: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        version: string;
        label: string;
        description: string;
        flow_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        device_id: string;
        manifest_href: string;
        tags?: Record<string, string[]> | undefined;
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        flow_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        device_id: string;
        manifest_href: string;
        tags?: Record<string, string[]> | undefined;
    }>, "many">;
    '/node/v1.0/senders/{sender_id}': import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        flow_id: import("zod").ZodString;
        transport: import("zod").ZodEnum<["urn:x-nmos:transport:rtp", "urn:x-nmos:transport:rtp.ucast", "urn:x-nmos:transport:rtp.mcast", "urn:x-nmos:transport:dash"]>;
        tags: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>>;
        device_id: import("zod").ZodString;
        manifest_href: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        version: string;
        label: string;
        description: string;
        flow_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        device_id: string;
        manifest_href: string;
        tags?: Record<string, string[]> | undefined;
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        flow_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        device_id: string;
        manifest_href: string;
        tags?: Record<string, string[]> | undefined;
    }>;
    '/node/v1.0/receivers': import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        format: import("zod").ZodEnum<["urn:x-nmos:format:video", "urn:x-nmos:format:audio", "urn:x-nmos:format:data"]>;
        caps: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
        device_id: import("zod").ZodString;
        transport: import("zod").ZodEnum<["urn:x-nmos:transport:rtp", "urn:x-nmos:transport:rtp.ucast", "urn:x-nmos:transport:rtp.mcast", "urn:x-nmos:transport:dash"]>;
        subscription: import("zod").ZodObject<{
            sender_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
        }, "strip", import("zod").ZodTypeAny, {
            sender_id: string | null;
        }, {
            sender_id?: string | null | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        caps: Record<string, any>;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        device_id: string;
        subscription: {
            sender_id: string | null;
        };
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        caps: Record<string, any>;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        device_id: string;
        subscription: {
            sender_id?: string | null | undefined;
        };
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }>, "many">;
    '/node/v1.0/receivers/{receiver_id}': import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        format: import("zod").ZodEnum<["urn:x-nmos:format:video", "urn:x-nmos:format:audio", "urn:x-nmos:format:data"]>;
        caps: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
        device_id: import("zod").ZodString;
        transport: import("zod").ZodEnum<["urn:x-nmos:transport:rtp", "urn:x-nmos:transport:rtp.ucast", "urn:x-nmos:transport:rtp.mcast", "urn:x-nmos:transport:dash"]>;
        subscription: import("zod").ZodObject<{
            sender_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
        }, "strip", import("zod").ZodTypeAny, {
            sender_id: string | null;
        }, {
            sender_id?: string | null | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        caps: Record<string, any>;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        device_id: string;
        subscription: {
            sender_id: string | null;
        };
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        caps: Record<string, any>;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        device_id: string;
        subscription: {
            sender_id?: string | null | undefined;
        };
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }>;
    '/node/v1.0/sources': import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        format: import("zod").ZodEnum<["urn:x-nmos:format:video", "urn:x-nmos:format:audio", "urn:x-nmos:format:data"]>;
        caps: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        caps: Record<string, any>;
        device_id: string;
        parents: string[];
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        caps: Record<string, any>;
        device_id: string;
        parents: string[];
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }>, "many">;
    '/node/v1.0/sources/{source_id}': import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        format: import("zod").ZodEnum<["urn:x-nmos:format:video", "urn:x-nmos:format:audio", "urn:x-nmos:format:data"]>;
        caps: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        caps: Record<string, any>;
        device_id: string;
        parents: string[];
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        caps: Record<string, any>;
        device_id: string;
        parents: string[];
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }>;
    '/node/v1.0/flows': import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        format: import("zod").ZodEnum<["urn:x-nmos:format:video", "urn:x-nmos:format:audio", "urn:x-nmos:format:data"]>;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
        source_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        source_id: string;
        parents: string[];
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        source_id: string;
        parents: string[];
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }>, "many">;
    '/node/v1.0/flows/{flow_id}': import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        format: import("zod").ZodEnum<["urn:x-nmos:format:video", "urn:x-nmos:format:audio", "urn:x-nmos:format:data"]>;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
        source_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        source_id: string;
        parents: string[];
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        tags: Record<string, string[]>;
        source_id: string;
        parents: string[];
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
    }>;
    '/node/v1.1/self': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        href: import("zod").ZodString;
        hostname: import("zod").ZodOptional<import("zod").ZodString>;
        api: import("zod").ZodObject<{
            versions: import("zod").ZodArray<import("zod").ZodString, "many">;
            endpoints: import("zod").ZodArray<import("zod").ZodObject<{
                host: import("zod").ZodUnion<[import("zod").ZodAny, import("zod").ZodAny, import("zod").ZodAny]>;
                port: import("zod").ZodNumber;
                protocol: import("zod").ZodEnum<["http", "https"]>;
            }, "strip", import("zod").ZodTypeAny, {
                port: number;
                protocol: "http" | "https";
                host?: any;
            }, {
                port: number;
                protocol: "http" | "https";
                host?: any;
            }>, "many">;
        }, "strip", import("zod").ZodTypeAny, {
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
        caps: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
        services: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>, "many">;
        clocks: import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodObject<{
            name: import("zod").ZodString;
            ref_type: import("zod").ZodLiteral<"internal">;
        }, "strip", import("zod").ZodTypeAny, {
            name: string;
            ref_type: "internal";
        }, {
            name: string;
            ref_type: "internal";
        }>, import("zod").ZodObject<{
            name: import("zod").ZodString;
            ref_type: import("zod").ZodLiteral<"ptp">;
            traceable: import("zod").ZodBoolean;
            version: import("zod").ZodLiteral<"IEEE1588-2008">;
            gmid: import("zod").ZodString;
            locked: import("zod").ZodBoolean;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
        caps: Record<string, any>;
        href: string;
        api: {
            versions: string[];
            endpoints: {
                port: number;
                protocol: "http" | "https";
                host?: any;
            }[];
        };
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
        hostname?: string | undefined;
    }, {
        caps: Record<string, any>;
        href: string;
        api: {
            versions: string[];
            endpoints: {
                port: number;
                protocol: "http" | "https";
                host?: any;
            }[];
        };
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
        hostname?: string | undefined;
    }>>>;
    '/node/v1.1/devices': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        node_id: import("zod").ZodString;
        senders: import("zod").ZodArray<import("zod").ZodString, "many">;
        receivers: import("zod").ZodArray<import("zod").ZodString, "many">;
        controls: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
        }[];
        type?: any;
    }, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
        }[];
        type?: any;
    }>>>, "many">;
    '/node/v1.1/devices/{device_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        node_id: import("zod").ZodString;
        senders: import("zod").ZodArray<import("zod").ZodString, "many">;
        receivers: import("zod").ZodArray<import("zod").ZodString, "many">;
        controls: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
        }[];
        type?: any;
    }, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
        }[];
        type?: any;
    }>>>;
    '/node/v1.1/senders': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        flow_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
        transport: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        device_id: import("zod").ZodString;
        manifest_href: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        flow_id: string | null;
        device_id: string;
        manifest_href: string;
        transport?: any;
    }, {
        device_id: string;
        manifest_href: string;
        flow_id?: string | null | undefined;
        transport?: any;
    }>>>, "many">;
    '/node/v1.1/senders/{sender_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        flow_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
        transport: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        device_id: import("zod").ZodString;
        manifest_href: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        flow_id: string | null;
        device_id: string;
        manifest_href: string;
        transport?: any;
    }, {
        device_id: string;
        manifest_href: string;
        flow_id?: string | null | undefined;
        transport?: any;
    }>>>;
    '/node/v1.1/receivers': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>, "many">;
    '/node/v1.1/receivers/{receiver_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>;
    '/node/v1.1/sources': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>, "many">;
    '/node/v1.1/sources/{source_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>;
    '/node/v1.1/flows': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodUnion<[import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodEnum<["SDR", "HLG", "PQ"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        transfer_characteristic: "SDR" | "HLG" | "PQ";
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        transfer_characteristic?: "SDR" | "HLG" | "PQ" | undefined;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodLiteral<"video/raw">;
        components: import("zod").ZodArray<import("zod").ZodObject<{
            name: import("zod").ZodEnum<["Y", "Cb", "Cr", "I", "Ct", "Cp", "A", "R", "G", "B", "DepthMap"]>;
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            bit_depth: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodEnum<["SDR", "HLG", "PQ"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        transfer_characteristic: "SDR" | "HLG" | "PQ";
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        transfer_characteristic?: "SDR" | "HLG" | "PQ" | undefined;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["video/H264", "video/vc2"]>, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["audio/L24", "audio/L20", "audio/L16", "audio/L8"]>, import("zod").ZodAny]>;
        bit_depth: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        bit_depth: number;
        media_type?: any;
    }, {
        bit_depth: number;
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodLiteral<"video/smpte291">;
        DID_SDID: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            DID: import("zod").ZodOptional<import("zod").ZodString>;
            SDID: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }>, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:mux">;
        media_type: import("zod").ZodUnion<[import("zod").ZodLiteral<"video/SMPTE2022-6">, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }>>>]>>, "many">;
    '/node/v1.1/flows/{flow_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodUnion<[import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodEnum<["SDR", "HLG", "PQ"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        transfer_characteristic: "SDR" | "HLG" | "PQ";
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        transfer_characteristic?: "SDR" | "HLG" | "PQ" | undefined;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodLiteral<"video/raw">;
        components: import("zod").ZodArray<import("zod").ZodObject<{
            name: import("zod").ZodEnum<["Y", "Cb", "Cr", "I", "Ct", "Cp", "A", "R", "G", "B", "DepthMap"]>;
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            bit_depth: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodEnum<["SDR", "HLG", "PQ"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        transfer_characteristic: "SDR" | "HLG" | "PQ";
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        transfer_characteristic?: "SDR" | "HLG" | "PQ" | undefined;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["video/H264", "video/vc2"]>, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["audio/L24", "audio/L20", "audio/L16", "audio/L8"]>, import("zod").ZodAny]>;
        bit_depth: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        bit_depth: number;
        media_type?: any;
    }, {
        bit_depth: number;
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodLiteral<"video/smpte291">;
        DID_SDID: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            DID: import("zod").ZodOptional<import("zod").ZodString>;
            SDID: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }>, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:mux">;
        media_type: import("zod").ZodUnion<[import("zod").ZodLiteral<"video/SMPTE2022-6">, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }>>>]>>;
    '/node/v1.2/self': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        href: import("zod").ZodString;
        hostname: import("zod").ZodOptional<import("zod").ZodString>;
        api: import("zod").ZodObject<{
            versions: import("zod").ZodArray<import("zod").ZodString, "many">;
            endpoints: import("zod").ZodArray<import("zod").ZodObject<{
                host: import("zod").ZodUnion<[import("zod").ZodAny, import("zod").ZodAny, import("zod").ZodAny]>;
                port: import("zod").ZodNumber;
                protocol: import("zod").ZodEnum<["http", "https"]>;
            }, "strip", import("zod").ZodTypeAny, {
                port: number;
                protocol: "http" | "https";
                host?: any;
            }, {
                port: number;
                protocol: "http" | "https";
                host?: any;
            }>, "many">;
        }, "strip", import("zod").ZodTypeAny, {
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
        caps: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
        services: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>, "many">;
        clocks: import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodObject<{
            name: import("zod").ZodString;
            ref_type: import("zod").ZodLiteral<"internal">;
        }, "strip", import("zod").ZodTypeAny, {
            name: string;
            ref_type: "internal";
        }, {
            name: string;
            ref_type: "internal";
        }>, import("zod").ZodObject<{
            name: import("zod").ZodString;
            ref_type: import("zod").ZodLiteral<"ptp">;
            traceable: import("zod").ZodBoolean;
            version: import("zod").ZodLiteral<"IEEE1588-2008">;
            gmid: import("zod").ZodString;
            locked: import("zod").ZodBoolean;
        }, "strip", import("zod").ZodTypeAny, {
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
        interfaces: import("zod").ZodArray<import("zod").ZodObject<{
            chassis_id: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString, import("zod").ZodNull]>;
            port_id: import("zod").ZodString;
            name: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            name: string;
            chassis_id: string | null;
            port_id: string;
        }, {
            name: string;
            chassis_id: string | null;
            port_id: string;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        caps: Record<string, any>;
        href: string;
        api: {
            versions: string[];
            endpoints: {
                port: number;
                protocol: "http" | "https";
                host?: any;
            }[];
        };
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
        caps: Record<string, any>;
        href: string;
        api: {
            versions: string[];
            endpoints: {
                port: number;
                protocol: "http" | "https";
                host?: any;
            }[];
        };
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
    '/node/v1.2/devices': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        node_id: import("zod").ZodString;
        senders: import("zod").ZodArray<import("zod").ZodString, "many">;
        receivers: import("zod").ZodArray<import("zod").ZodString, "many">;
        controls: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
        }[];
        type?: any;
    }, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
        }[];
        type?: any;
    }>>>, "many">;
    '/node/v1.2/devices/{device_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        node_id: import("zod").ZodString;
        senders: import("zod").ZodArray<import("zod").ZodString, "many">;
        receivers: import("zod").ZodArray<import("zod").ZodString, "many">;
        controls: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
        }[];
        type?: any;
    }, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
        }[];
        type?: any;
    }>>>;
    '/node/v1.2/senders': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        caps: import("zod").ZodOptional<import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>>;
        flow_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
        transport: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        device_id: import("zod").ZodString;
        manifest_href: import("zod").ZodString;
        interface_bindings: import("zod").ZodArray<import("zod").ZodString, "many">;
        subscription: import("zod").ZodObject<{
            receiver_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
            active: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            receiver_id: string | null;
            active: boolean;
        }, {
            receiver_id?: string | null | undefined;
            active?: boolean | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        flow_id: string | null;
        device_id: string;
        manifest_href: string;
        interface_bindings: string[];
        subscription: {
            receiver_id: string | null;
            active: boolean;
        };
        caps?: {} | undefined;
        transport?: any;
    }, {
        device_id: string;
        manifest_href: string;
        interface_bindings: string[];
        subscription: {
            receiver_id?: string | null | undefined;
            active?: boolean | undefined;
        };
        caps?: {} | undefined;
        flow_id?: string | null | undefined;
        transport?: any;
    }>>>, "many">;
    '/node/v1.2/senders/{sender_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        caps: import("zod").ZodOptional<import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>>;
        flow_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
        transport: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        device_id: import("zod").ZodString;
        manifest_href: import("zod").ZodString;
        interface_bindings: import("zod").ZodArray<import("zod").ZodString, "many">;
        subscription: import("zod").ZodObject<{
            receiver_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
            active: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            receiver_id: string | null;
            active: boolean;
        }, {
            receiver_id?: string | null | undefined;
            active?: boolean | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        flow_id: string | null;
        device_id: string;
        manifest_href: string;
        interface_bindings: string[];
        subscription: {
            receiver_id: string | null;
            active: boolean;
        };
        caps?: {} | undefined;
        transport?: any;
    }, {
        device_id: string;
        manifest_href: string;
        interface_bindings: string[];
        subscription: {
            receiver_id?: string | null | undefined;
            active?: boolean | undefined;
        };
        caps?: {} | undefined;
        flow_id?: string | null | undefined;
        transport?: any;
    }>>>;
    '/node/v1.2/receivers': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>, "many">;
    '/node/v1.2/receivers/{receiver_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>;
    '/node/v1.2/sources': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>, "many">;
    '/node/v1.2/sources/{source_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>;
    '/node/v1.2/flows': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodUnion<[import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodEnum<["SDR", "HLG", "PQ"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        transfer_characteristic: "SDR" | "HLG" | "PQ";
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        transfer_characteristic?: "SDR" | "HLG" | "PQ" | undefined;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodLiteral<"video/raw">;
        components: import("zod").ZodArray<import("zod").ZodObject<{
            name: import("zod").ZodEnum<["Y", "Cb", "Cr", "I", "Ct", "Cp", "A", "R", "G", "B", "DepthMap"]>;
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            bit_depth: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodEnum<["SDR", "HLG", "PQ"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        transfer_characteristic: "SDR" | "HLG" | "PQ";
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        transfer_characteristic?: "SDR" | "HLG" | "PQ" | undefined;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["video/H264", "video/vc2"]>, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["audio/L24", "audio/L20", "audio/L16", "audio/L8"]>, import("zod").ZodAny]>;
        bit_depth: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        bit_depth: number;
        media_type?: any;
    }, {
        bit_depth: number;
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodLiteral<"video/smpte291">;
        DID_SDID: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            DID: import("zod").ZodOptional<import("zod").ZodString>;
            SDID: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }>, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:mux">;
        media_type: import("zod").ZodUnion<[import("zod").ZodLiteral<"video/SMPTE2022-6">, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }>>>]>>, "many">;
    '/node/v1.2/flows/{flow_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodUnion<[import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodEnum<["SDR", "HLG", "PQ"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        transfer_characteristic: "SDR" | "HLG" | "PQ";
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        transfer_characteristic?: "SDR" | "HLG" | "PQ" | undefined;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodLiteral<"video/raw">;
        components: import("zod").ZodArray<import("zod").ZodObject<{
            name: import("zod").ZodEnum<["Y", "Cb", "Cr", "I", "Ct", "Cp", "A", "R", "G", "B", "DepthMap"]>;
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            bit_depth: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodEnum<["SDR", "HLG", "PQ"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        transfer_characteristic: "SDR" | "HLG" | "PQ";
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        colorspace: "BT601" | "BT709" | "BT2020" | "BT2100";
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        transfer_characteristic?: "SDR" | "HLG" | "PQ" | undefined;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["video/H264", "video/vc2"]>, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["audio/L24", "audio/L20", "audio/L16", "audio/L8"]>, import("zod").ZodAny]>;
        bit_depth: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        bit_depth: number;
        media_type?: any;
    }, {
        bit_depth: number;
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodLiteral<"video/smpte291">;
        DID_SDID: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            DID: import("zod").ZodOptional<import("zod").ZodString>;
            SDID: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }>, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:mux">;
        media_type: import("zod").ZodUnion<[import("zod").ZodLiteral<"video/SMPTE2022-6">, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }>>>]>>;
    '/node/v1.3/self': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        href: import("zod").ZodString;
        hostname: import("zod").ZodOptional<import("zod").ZodString>;
        api: import("zod").ZodObject<{
            versions: import("zod").ZodArray<import("zod").ZodString, "many">;
            endpoints: import("zod").ZodArray<import("zod").ZodObject<{
                host: import("zod").ZodUnion<[import("zod").ZodAny, import("zod").ZodAny, import("zod").ZodAny]>;
                port: import("zod").ZodNumber;
                protocol: import("zod").ZodEnum<["http", "https"]>;
                authorization: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        caps: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
        services: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
            authorization: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
            authorization: boolean;
        }, {
            type: string;
            href: string;
            authorization?: boolean | undefined;
        }>, "many">;
        clocks: import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodObject<{
            name: import("zod").ZodString;
            ref_type: import("zod").ZodLiteral<"internal">;
        }, "strip", import("zod").ZodTypeAny, {
            name: string;
            ref_type: "internal";
        }, {
            name: string;
            ref_type: "internal";
        }>, import("zod").ZodObject<{
            name: import("zod").ZodString;
            ref_type: import("zod").ZodLiteral<"ptp">;
            traceable: import("zod").ZodBoolean;
            version: import("zod").ZodLiteral<"IEEE1588-2008">;
            gmid: import("zod").ZodString;
            locked: import("zod").ZodBoolean;
        }, "strip", import("zod").ZodTypeAny, {
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
        interfaces: import("zod").ZodArray<import("zod").ZodObject<{
            chassis_id: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString, import("zod").ZodNull]>;
            port_id: import("zod").ZodString;
            name: import("zod").ZodString;
            attached_network_device: import("zod").ZodOptional<import("zod").ZodObject<{
                chassis_id: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>;
                port_id: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>;
            }, "strip", import("zod").ZodTypeAny, {
                chassis_id: string;
                port_id: string;
            }, {
                chassis_id: string;
                port_id: string;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
        caps: Record<string, any>;
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
        caps: Record<string, any>;
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
    '/node/v1.3/devices': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        node_id: import("zod").ZodString;
        senders: import("zod").ZodArray<import("zod").ZodString, "many">;
        receivers: import("zod").ZodArray<import("zod").ZodString, "many">;
        controls: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
            authorization: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
            authorization: boolean;
        }, {
            type: string;
            href: string;
            authorization?: boolean | undefined;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
            authorization: boolean;
        }[];
        type?: any;
    }, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
            authorization?: boolean | undefined;
        }[];
        type?: any;
    }>>>, "many">;
    '/node/v1.3/devices/{device_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        node_id: import("zod").ZodString;
        senders: import("zod").ZodArray<import("zod").ZodString, "many">;
        receivers: import("zod").ZodArray<import("zod").ZodString, "many">;
        controls: import("zod").ZodArray<import("zod").ZodObject<{
            href: import("zod").ZodString;
            type: import("zod").ZodString;
            authorization: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            type: string;
            href: string;
            authorization: boolean;
        }, {
            type: string;
            href: string;
            authorization?: boolean | undefined;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
            authorization: boolean;
        }[];
        type?: any;
    }, {
        node_id: string;
        senders: string[];
        receivers: string[];
        controls: {
            type: string;
            href: string;
            authorization?: boolean | undefined;
        }[];
        type?: any;
    }>>>;
    '/node/v1.3/senders': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        caps: import("zod").ZodOptional<import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>>;
        flow_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
        transport: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        device_id: import("zod").ZodString;
        manifest_href: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNull]>;
        interface_bindings: import("zod").ZodArray<import("zod").ZodString, "many">;
        subscription: import("zod").ZodObject<{
            receiver_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
            active: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            receiver_id: string | null;
            active: boolean;
        }, {
            receiver_id?: string | null | undefined;
            active?: boolean | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        flow_id: string | null;
        device_id: string;
        manifest_href: string | null;
        interface_bindings: string[];
        subscription: {
            receiver_id: string | null;
            active: boolean;
        };
        caps?: {} | undefined;
        transport?: any;
    }, {
        device_id: string;
        manifest_href: string | null;
        interface_bindings: string[];
        subscription: {
            receiver_id?: string | null | undefined;
            active?: boolean | undefined;
        };
        caps?: {} | undefined;
        flow_id?: string | null | undefined;
        transport?: any;
    }>>>, "many">;
    '/node/v1.3/senders/{sender_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        caps: import("zod").ZodOptional<import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>>;
        flow_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
        transport: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
        device_id: import("zod").ZodString;
        manifest_href: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNull]>;
        interface_bindings: import("zod").ZodArray<import("zod").ZodString, "many">;
        subscription: import("zod").ZodObject<{
            receiver_id: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodDefault<import("zod").ZodNull>]>>;
            active: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            receiver_id: string | null;
            active: boolean;
        }, {
            receiver_id?: string | null | undefined;
            active?: boolean | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        flow_id: string | null;
        device_id: string;
        manifest_href: string | null;
        interface_bindings: string[];
        subscription: {
            receiver_id: string | null;
            active: boolean;
        };
        caps?: {} | undefined;
        transport?: any;
    }, {
        device_id: string;
        manifest_href: string | null;
        interface_bindings: string[];
        subscription: {
            receiver_id?: string | null | undefined;
            active?: boolean | undefined;
        };
        caps?: {} | undefined;
        flow_id?: string | null | undefined;
        transport?: any;
    }>>>;
    '/node/v1.3/receivers': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>, "many">;
    '/node/v1.3/receivers/{receiver_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>;
    '/node/v1.3/sources': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>, "many">;
    '/node/v1.3/sources/{source_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodEffects<import("zod").ZodAny, any, any>>;
    '/node/v1.3/flows': import("zod").ZodArray<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodUnion<[import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodUnion<[import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>, import("zod").ZodAny]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodEnum<["SDR", "HLG", "PQ"]>, import("zod").ZodAny]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace?: any;
        transfer_characteristic?: any;
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        colorspace?: any;
        transfer_characteristic?: any;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodLiteral<"video/raw">;
        components: import("zod").ZodArray<import("zod").ZodObject<{
            name: import("zod").ZodEnum<["Y", "Cb", "Cr", "I", "Ct", "Cp", "A", "R", "G", "B", "DepthMap"]>;
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            bit_depth: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodUnion<[import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>, import("zod").ZodAny]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodEnum<["SDR", "HLG", "PQ"]>, import("zod").ZodAny]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace?: any;
        transfer_characteristic?: any;
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        colorspace?: any;
        transfer_characteristic?: any;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["video/H264", "video/vc2"]>, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["audio/L24", "audio/L20", "audio/L16", "audio/L8"]>, import("zod").ZodAny]>;
        bit_depth: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        bit_depth: number;
        media_type?: any;
    }, {
        bit_depth: number;
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodLiteral<"video/smpte291">;
        DID_SDID: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            DID: import("zod").ZodOptional<import("zod").ZodString>;
            SDID: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }>, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodLiteral<"application/json">;
        event_type: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type: "application/json";
        event_type?: string | undefined;
    }, {
        format: "urn:x-nmos:format:data";
        media_type: "application/json";
        event_type?: string | undefined;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:mux">;
        media_type: import("zod").ZodUnion<[import("zod").ZodLiteral<"video/SMPTE2022-6">, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }>>>]>>, "many">;
    '/node/v1.3/flows/{flow_id}': import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodUnion<[import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodUnion<[import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>, import("zod").ZodAny]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodEnum<["SDR", "HLG", "PQ"]>, import("zod").ZodAny]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace?: any;
        transfer_characteristic?: any;
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        colorspace?: any;
        transfer_characteristic?: any;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodLiteral<"video/raw">;
        components: import("zod").ZodArray<import("zod").ZodObject<{
            name: import("zod").ZodEnum<["Y", "Cb", "Cr", "I", "Ct", "Cp", "A", "R", "G", "B", "DepthMap"]>;
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            bit_depth: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }, {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }, {
        media_type: "video/raw";
        components: {
            name: "Y" | "Cb" | "Cr" | "I" | "Ct" | "Cp" | "A" | "R" | "G" | "B" | "DepthMap";
            width: number;
            height: number;
            bit_depth: number;
        }[];
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:video">;
        frame_width: import("zod").ZodNumber;
        frame_height: import("zod").ZodNumber;
        interlace_mode: import("zod").ZodDefault<import("zod").ZodEnum<["progressive", "interlaced_tff", "interlaced_bff", "interlaced_psf"]>>;
        colorspace: import("zod").ZodUnion<[import("zod").ZodEnum<["BT601", "BT709", "BT2020", "BT2100"]>, import("zod").ZodAny]>;
        transfer_characteristic: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodEnum<["SDR", "HLG", "PQ"]>, import("zod").ZodAny]>>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf";
        colorspace?: any;
        transfer_characteristic?: any;
    }, {
        format: "urn:x-nmos:format:video";
        frame_width: number;
        frame_height: number;
        interlace_mode?: "progressive" | "interlaced_tff" | "interlaced_bff" | "interlaced_psf" | undefined;
        colorspace?: any;
        transfer_characteristic?: any;
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["video/H264", "video/vc2"]>, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodUnion<[import("zod").ZodEnum<["audio/L24", "audio/L20", "audio/L16", "audio/L8"]>, import("zod").ZodAny]>;
        bit_depth: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        bit_depth: number;
        media_type?: any;
    }, {
        bit_depth: number;
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:audio">;
        sample_rate: import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator: number;
        };
    }, {
        format: "urn:x-nmos:format:audio";
        sample_rate: {
            numerator: number;
            denominator?: number | undefined;
        };
    }>>>, import("zod").ZodObject<{
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        media_type?: any;
    }, {
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:data";
        media_type?: any;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodLiteral<"video/smpte291">;
        DID_SDID: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            DID: import("zod").ZodOptional<import("zod").ZodString>;
            SDID: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }, {
            DID?: string | undefined;
            SDID?: string | undefined;
        }>, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }, {
        format: "urn:x-nmos:format:data";
        media_type: "video/smpte291";
        DID_SDID?: {
            DID?: string | undefined;
            SDID?: string | undefined;
        }[] | undefined;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:data">;
        media_type: import("zod").ZodLiteral<"application/json">;
        event_type: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:data";
        media_type: "application/json";
        event_type?: string | undefined;
    }, {
        format: "urn:x-nmos:format:data";
        media_type: "application/json";
        event_type?: string | undefined;
    }>>>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodObject<{
        id: import("zod").ZodString;
        version: import("zod").ZodString;
        label: import("zod").ZodString;
        description: import("zod").ZodString;
        tags: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>, Record<string, string[]>, Record<string, string[]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        grain_rate: import("zod").ZodOptional<import("zod").ZodObject<{
            numerator: import("zod").ZodNumber;
            denominator: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            numerator: number;
            denominator: number;
        }, {
            numerator: number;
            denominator?: number | undefined;
        }>>;
        source_id: import("zod").ZodString;
        device_id: import("zod").ZodString;
        parents: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator: number;
        } | undefined;
    }, {
        device_id: string;
        source_id: string;
        parents: string[];
        grain_rate?: {
            numerator: number;
            denominator?: number | undefined;
        } | undefined;
    }>>>, import("zod").ZodObject<{
        format: import("zod").ZodLiteral<"urn:x-nmos:format:mux">;
        media_type: import("zod").ZodUnion<[import("zod").ZodLiteral<"video/SMPTE2022-6">, import("zod").ZodAny]>;
    }, "strip", import("zod").ZodTypeAny, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }, {
        format: "urn:x-nmos:format:mux";
        media_type?: any;
    }>>>]>>;
};
