
import superagent from 'superagent'

export const safeSuperagent = async (fn: () => Promise<superagent.Response>): Promise<SUPERAGENT_RESPONSE> => {
	try {
		const res = await fn()
		return { ok: res, error: null }
	} catch (e) {
		if (e instanceof Error) {
			if (e.message.includes('404')) {
				return { ok: null, error: { code: 'SUPERAGENT_404', message: e.message } }
			}
			if (e.message.includes('500')) {
				return { ok: null, error: { code: 'SUPERAGENT_500', message: e.message } }
			}
			if (e.message.includes('timeout')) {
				return { ok: null, error: { code: 'SUPERAGENT_TIMEOUT', message: e.message } }
			}
			if (e.message.includes('ECONNREFUSED')) {
				return { ok: null, error: { code: 'SUPERAGENT_CONN_REFUSED', message: e.message } }
			}
			if (e.message.includes('ECONNABORTED')) {
				return { ok: null, error: { code: 'SUPERAGENT_CONN_ABORTED', message: e.message } }
			}
			if (e.message.includes('ECONNRESET')) {
				return { ok: null, error: { code: 'SUPERAGENT_CONN_RESET', message: e.message } }
			}
			if (e.message.includes('ECONNREFUSED')) {
				return { ok: null, error: { code: 'SUPERAGENT_CONN_REFUSED', message: e.message } }
			}
		}
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
