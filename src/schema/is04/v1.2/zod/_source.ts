import { z } from 'zod'
import { _audioChannels } from './_propAudioChannels'
import { _nmosResourceBase } from './_nnosResourceBase'
import { _sourceBase } from './_sourceBase'

export default _nmosResourceBase
	.and(_sourceBase)
	.and(
		z.discriminatedUnion('format', [
			z.object({
				format: z
					.literal('urn:x-nmos:format:audio')
					.describe('Format of the data coming from the Source as a URN'),
				channels: _audioChannels.describe('Array of objects describing the audio channels'),
			}),
			z.object({
				format: z
					.literal('urn:x-nmos:format:data')
					.describe('Format of the data coming from the Source as a URN'),
			}),
			z.object({
				format: z
					.enum(['urn:x-nmos:format:video', 'urn:x-nmos:format:mux'])
					.describe('Format of the data coming from the Source as a URN'),
			}),
		]),
	)
	.describe('Describes a Source')
