import { z } from "zod"

export const URNTransportSchema = z.union([
    z.literal('urn:x-nmos:transport:rtp'),
    z.literal('urn:x-nmos:transport:rtp.mcast'),
    z.literal('urn:x-nmos:transport:rtp.ucast'),
    z.literal('urn:x-nmos:transport:dash'),
    z.literal('urn:x-nmos:transport:mqtt'),
    z.literal('urn:x-nmos:transport:websocket'),
])

export const URNFormatSchema = z.union([
    z.literal('urn:x-nmos:format:audio'),
    z.literal('urn:x-nmos:format:video'),
    z.literal('urn:x-nmos:format:data'),
    z.literal('urn:x-nmos:format:mux'),
])

export const URNServiceSchema = z.union([
    z.literal('urn:x-ipstudio:service:mdnsbridge/v1.0'),
    z.literal('urn:x-manufacturer:service:status'),
    z.literal('urn:x-manufacturer:service:pipelinemanager'),
])

export const URNControlSchema = z.union([
    z.literal('urn:x-nmos:control:sr-ctrl/v1.0'),
    z.literal('urn:x-nmos:control:sr-ctrl/v1.1'),
    z.literal('urn:x-nmos:control:cm-ctrl/v1.0'),
    z.literal('urn:x-nmos:control:manifest-base/v1.0'),
    z.literal('urn:x-nmos:control:events/v1.0'),
])