import node from './zod/node.json'
import devices from './zod/devices.json'
import device from './zod/device.json'
import senders from './zod/senders.json'
import sender from './zod/sender.json'
import receivers from './zod/receivers.json'
import receiver from './zod/receiver.json'
import sources from './zod/sources.json'
import source from './zod/source.json'
import flows from './zod/flows.json'
import flow from './zod/flow.json'

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
