import node from './zod/_node.json'
import devices from './zod/_devices.json'
import device from './zod/_device.json'
import senders from './zod/_senders.json'
import sender from './zod/_sender.json'
import receivers from './zod/_receivers.json'
import receiver from './zod/_receiver.json'
import sources from './zod/_sources.json'
import source from './zod/_source.json'
import flows from './zod/_flows.json'
import flow from './zod/_flow.json'

export default {
	'/node/v1.2/self': node,
	'/node/v1.2/devices': devices,
	'/node/v1.2/devices/{device_id}': device,
	'/node/v1.2/senders': senders,
	'/node/v1.2/senders/{sender_id}': sender,
	'/node/v1.2/receivers': receivers,
	'/node/v1.2/receivers/{receiver_id}': receiver,
	'/node/v1.2/sources': sources,
	'/node/v1.2/sources/{source_id}': source,
	'/node/v1.2/flows': flows,
	'/node/v1.2/flows/{flow_id}': flow,
}
