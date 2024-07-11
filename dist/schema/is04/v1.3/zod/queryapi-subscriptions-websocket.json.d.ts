import { z } from 'zod';
declare const _default: z.ZodObject<{
    grain_type: z.ZodLiteral<"event">;
    source_id: z.ZodString;
    flow_id: z.ZodString;
    origin_timestamp: z.ZodString;
    sync_timestamp: z.ZodString;
    creation_timestamp: z.ZodString;
    rate: z.ZodObject<{
        numerator: z.ZodNumber;
        denominator: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        numerator: number;
        denominator: number;
    }, {
        numerator: number;
        denominator: number;
    }>;
    duration: z.ZodObject<{
        numerator: z.ZodNumber;
        denominator: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        numerator: number;
        denominator: number;
    }, {
        numerator: number;
        denominator: number;
    }>;
    grain: z.ZodObject<{
        type: z.ZodLiteral<"urn:x-nmos:format:data.event">;
        topic: z.ZodEnum<["/nodes/", "/devices/", "/sources/", "/flows/", "/senders/", "/receivers/"]>;
        data: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            pre: z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodEffects<z.ZodAny, any, any>>>;
            post: z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodEffects<z.ZodAny, any, any>>>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            post?: any;
            pre?: any;
        }, {
            path: string;
            post?: any;
            pre?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "urn:x-nmos:format:data.event";
        topic: "/nodes/" | "/devices/" | "/sources/" | "/flows/" | "/senders/" | "/receivers/";
        data: {
            path: string;
            post?: any;
            pre?: any;
        }[];
    }, {
        type: "urn:x-nmos:format:data.event";
        topic: "/nodes/" | "/devices/" | "/sources/" | "/flows/" | "/senders/" | "/receivers/";
        data: {
            path: string;
            post?: any;
            pre?: any;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    flow_id: string;
    source_id: string;
    grain_type: "event";
    origin_timestamp: string;
    sync_timestamp: string;
    creation_timestamp: string;
    rate: {
        numerator: number;
        denominator: number;
    };
    duration: {
        numerator: number;
        denominator: number;
    };
    grain: {
        type: "urn:x-nmos:format:data.event";
        topic: "/nodes/" | "/devices/" | "/sources/" | "/flows/" | "/senders/" | "/receivers/";
        data: {
            path: string;
            post?: any;
            pre?: any;
        }[];
    };
}, {
    flow_id: string;
    source_id: string;
    grain_type: "event";
    origin_timestamp: string;
    sync_timestamp: string;
    creation_timestamp: string;
    rate: {
        numerator: number;
        denominator: number;
    };
    duration: {
        numerator: number;
        denominator: number;
    };
    grain: {
        type: "urn:x-nmos:format:data.event";
        topic: "/nodes/" | "/devices/" | "/sources/" | "/flows/" | "/senders/" | "/receivers/";
        data: {
            path: string;
            post?: any;
            pre?: any;
        }[];
    };
}>;
export default _default;
