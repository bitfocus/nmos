import type { SUPERAGENT_ERROR } from './neverthrow_superagent'
import type { ZOD_WRAPPED_ERROR } from './neverthrow_zod'
import type { Result } from 'neverthrow'

export type NeverthrowError = SUPERAGENT_ERROR | ZOD_WRAPPED_ERROR

// Use real neverthrow Result throughout the NMOS external library
export type NeverthrowResult<T, E = never> = Result<T, NeverthrowError | E>
export type NeverthrowZodResult<T> = Result<T, ZOD_WRAPPED_ERROR>
export type NeverthorwSuperagentResult<T> = Result<T, SUPERAGENT_ERROR>
