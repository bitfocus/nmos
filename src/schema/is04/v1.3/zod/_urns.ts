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



const versionPattern = /^v\d+\.\d+$/;
export const URNNMOSControlFutureSchema = z.string().superRefine((urn,ctx) => {

    if (!urn.startsWith('urn')){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Futureproof URN Control: urn must start with 'urn' " + urn,
        });
        return z.NEVER
    }


    const parts = urn.split("/");
    if (parts.length > 2) {
      ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "NonNMOS URN has more than one '/'",
      });
      return z.NEVER
    }
  
    const [baseAndSub, version] = parts;
    
    const baseParts = baseAndSub.split(":");
    const urnPrefix = baseParts[0];
    const urnNmos = baseParts[1];
    const urnControl = baseParts[2];

    if (urnNmos === 'x-nmos' && urnControl !== 'control'){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Futureproof URN Control: x-nmos domain must start with 'urn:x-nmos:control' " + urn,
        });
        return z.NEVER
    }
  
    // Validate optional version
    if (version && !versionPattern.test(version)) {
      ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Futureproof URN Control: version is invalid",
      });
      return z.NEVER
    }

    return z.OK
});

export const URNControlSchema = z.union([
    z.literal('urn:x-nmos:control:sr-ctrl/v1.0'),
    z.literal('urn:x-nmos:control:sr-ctrl/v1.1'),
    z.literal('urn:x-nmos:control:cm-ctrl/v1.0'),
    z.literal('urn:x-nmos:control:manifest-base/v1.0'),
    z.literal('urn:x-nmos:control:events/v1.0'),
    z.literal('urn:x-nmos:control:stream-compat/v1.0'),
    URNNMOSControlFutureSchema as z.ZodSchema<'urn:x-nmos:control' | 'urn'>
])
