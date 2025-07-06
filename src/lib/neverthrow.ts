import type { SUPERAGENT_ERROR } from './neverthrow_superagent'
import type { ZOD_WRAPPED_ERROR } from './neverthrow_zod'

export type NeverthrowError = SUPERAGENT_ERROR | ZOD_WRAPPED_ERROR

// Conditional type that provides overload-like behavior
export type NeverthrowResult<T, E = never> = [E] extends [never]
	? { ok: T; error: null } | { ok: null; error: NeverthrowError }
	: { ok: T; error: null } | { ok: null; error: NeverthrowError } | E
