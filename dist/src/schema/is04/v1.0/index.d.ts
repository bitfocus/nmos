declare const _default: {
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
        id: string;
        version: string;
        label: string;
        type: string;
        node_id: string;
        senders: string[];
        receivers: string[];
    }, {
        id: string;
        version: string;
        label: string;
        type: string;
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
        id: string;
        version: string;
        label: string;
        type: string;
        node_id: string;
        senders: string[];
        receivers: string[];
    }, {
        id: string;
        version: string;
        label: string;
        type: string;
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
        device_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        flow_id: string;
        manifest_href: string;
        tags?: Record<string, string[]> | undefined;
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        device_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        flow_id: string;
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
        device_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        flow_id: string;
        manifest_href: string;
        tags?: Record<string, string[]> | undefined;
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        device_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        flow_id: string;
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
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        caps: Record<string, any>;
        tags: Record<string, string[]>;
        device_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        subscription: {
            sender_id: string | null;
        };
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        caps: Record<string, any>;
        tags: Record<string, string[]>;
        device_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        subscription: {
            sender_id?: string | null | undefined;
        };
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
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        caps: Record<string, any>;
        tags: Record<string, string[]>;
        device_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        subscription: {
            sender_id: string | null;
        };
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        caps: Record<string, any>;
        tags: Record<string, string[]>;
        device_id: string;
        transport: "urn:x-nmos:transport:rtp" | "urn:x-nmos:transport:rtp.ucast" | "urn:x-nmos:transport:rtp.mcast" | "urn:x-nmos:transport:dash";
        subscription: {
            sender_id?: string | null | undefined;
        };
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
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        caps: Record<string, any>;
        tags: Record<string, string[]>;
        device_id: string;
        parents: string[];
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        caps: Record<string, any>;
        tags: Record<string, string[]>;
        device_id: string;
        parents: string[];
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
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        caps: Record<string, any>;
        tags: Record<string, string[]>;
        device_id: string;
        parents: string[];
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        caps: Record<string, any>;
        tags: Record<string, string[]>;
        device_id: string;
        parents: string[];
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
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        tags: Record<string, string[]>;
        parents: string[];
        source_id: string;
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        tags: Record<string, string[]>;
        parents: string[];
        source_id: string;
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
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        tags: Record<string, string[]>;
        parents: string[];
        source_id: string;
    }, {
        id: string;
        version: string;
        label: string;
        description: string;
        format: "urn:x-nmos:format:video" | "urn:x-nmos:format:audio" | "urn:x-nmos:format:data";
        tags: Record<string, string[]>;
        parents: string[];
        source_id: string;
    }>;
};
export default _default;
