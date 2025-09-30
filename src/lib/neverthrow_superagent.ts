import type superagent from 'superagent'

export const safeSuperagent = async (fn: () => Promise<superagent.Response>): Promise<SUPERAGENT_RESPONSE> => {
	try {
		const res = await fn()
		return { ok: res, error: null }
	} catch (e) {
		const err = e
		if (err instanceof Error) {
			if (safeErrStatus(err) === 404 || err.message.includes('404')) {
				return { ok: null, error: { code: 'SUPERAGENT_404', message: err.message } }
			}
			if (safeErrStatus(err) === 500 || err.message.includes('500')) {
				return { ok: null, error: { code: 'SUPERAGENT_500', message: err.message } }
			}
			if (safeErrStatus(err) === 400 || err.message.includes('400')) {
				return { ok: null, error: { code: 'SUPERAGENT_400', message: err.message } }
			}
			if (err.message.includes('Timeout')) {
				return { ok: null, error: { code: 'SUPERAGENT_TIMEOUT', message: err.message } }
			}
			if (err.message.includes('ECONNREFUSED')) {
				return { ok: null, error: { code: 'SUPERAGENT_CONN_REFUSED', message: err.message } }
			}
			if (err.message.includes('ECONNABORTED')) {
				return { ok: null, error: { code: 'SUPERAGENT_CONN_ABORTED', message: err.message } }
			}
			if (err.message.includes('ECONNRESET')) {
				return { ok: null, error: { code: 'SUPERAGENT_CONN_RESET', message: err.message } }
			}
			if (err.message.includes('ECONNREFUSED')) {
				return { ok: null, error: { code: 'SUPERAGENT_CONN_REFUSED', message: err.message } }
			}
		}
		console.error(e)
		return {
			ok: null,
			error: { code: 'SUPERAGENT_UNKNOWN_ERROR', message: e instanceof Error ? e.message : 'Unknown error' },
		}
	}
}

export type SUPERAGENT_ERROR_CODE =
	| 'SUPERAGENT_CONN_ABORTED'
	| 'SUPERAGENT_404'
	| 'SUPERAGENT_500'
	| 'SUPERAGENT_400'
	| 'SUPERAGENT_UNKNOWN'
	| 'SUPERAGENT_TIMEOUT'
	| 'SUPERAGENT_CONN_REFUSED'
	| 'SUPERAGENT_CONN_ABORTED'
	| 'SUPERAGENT_CONN_RESET'
	| 'SUPERAGENT_UNKNOWN_ERROR'

export type SUPERAGENT_ERROR = {
	code: SUPERAGENT_ERROR_CODE
	message: string
}

export type SUPERAGENT_RESPONSE = { ok: superagent.Response; error: null } | { ok: null; error: SUPERAGENT_ERROR }

const safeErrStatus = (e: Error): number => {
	if ('status' in e && typeof e.status === 'number') {
		return e.status
	}
	return 0
}
