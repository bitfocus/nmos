import node from './zod/_node'
import devices from './zod/_devices'
import device from './zod/_device'
import senders from './zod/_senders'
import sender from './zod/_sender'
import receivers from './zod/_receivers'
import receiver from './zod/_receiver'
import sources from './zod/_sources'
import source from './zod/_source'
import flows from './zod/_flows'
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
