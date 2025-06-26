import type { SUPERAGENT_ERROR } from "./neverthrow_superagent";
import type { ZOD_WRAPPED_ERROR } from "./neverthrow_zod";

export type NeverthrowError = SUPERAGENT_ERROR | ZOD_WRAPPED_ERROR

export type NeverthrowResult<T> = { ok: T; error: null } | { ok: null; error: NeverthrowError }
