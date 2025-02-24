import { z } from "zod";

export const idPrimitive = z.string().regex(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'))
export const versionPrimitive = z.string().regex(new RegExp('^[0-9]+:[0-9]+$'))
export const _macAdressPrimitive = z
    .string()
    .regex(new RegExp('^([0-9a-f]{2}-){5}([0-9a-f]{2})$'))
export const _portPrimitive = z
    .number()
    .int()
    .gte(1)
    .lte(65535)