import type { ZodIssue } from "zod"

export type ZOD_WRAPPED_ERROR = {
    code: 'ZOD_ERROR'
    message: string
    issues?: ZodIssue[]
}