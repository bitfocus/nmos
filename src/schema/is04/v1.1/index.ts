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
	'/node/v1.1/self': node,
	'/node/v1.1/devices': devices,
	'/node/v1.1/devices/{device_id}': device,
	'/node/v1.1/senders': senders,
	'/node/v1.1/senders/{sender_id}': sender,
	'/node/v1.1/receivers': receivers,
	'/node/v1.1/receivers/{receiver_id}': receiver,
	'/node/v1.1/sources': sources,
	'/node/v1.1/sources/{source_id}': source,
	'/node/v1.1/flows': flows,
	'/node/v1.1/flows/{flow_id}': flow,
}
