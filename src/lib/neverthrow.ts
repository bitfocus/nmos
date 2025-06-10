import type { SUPERAGENT_ERROR } from "./neverthrow_superagent";
import type { ZOD_WRAPPED_ERROR } from "./neverthrow_zod";

export type NeverthrowResult<T> = { ok: T; error: null } | { ok: null; error: SUPERAGENT_ERROR | ZOD_WRAPPED_ERROR }
