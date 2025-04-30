import node from './zod/_node'
import devices from './zod/_devices'
import device from './zod/_device'
import senders from './zod/_senders.json'
import sender from './zod/_sender.json'
import receivers from './zod/_receivers'
import receiver from './zod/_receiver.json'
import sources from './zod/_sources.json'
import source from './zod/_source.json'
import flows from './zod/_flows.json'
import flow from './zod/_flow'

export default {
	'/node/v1.3/self': node,
	'/node/v1.3/devices': devices,
	'/node/v1.3/devices/{device_id}': device,
	'/node/v1.3/senders': senders,
	'/node/v1.3/senders/{sender_id}': sender,
	'/node/v1.3/receivers': receivers,
	'/node/v1.3/receivers/{receiver_id}': receiver,
	'/node/v1.3/sources': sources,
	'/node/v1.3/sources/{source_id}': source,
	'/node/v1.3/flows': flows,
	'/node/v1.3/flows/{flow_id}': flow,
}
