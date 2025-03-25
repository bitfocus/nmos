//import activationResponse from './zod/activation-response-schema.json';
//import activation from './zod/activation-schema.json';
import bulkReceiverPost from './zod/bulk-receiver-post-schema';
//import bulkResponse from './zod/bulk-response-schema.json';
import bulkSenderPost from './zod/bulk-sender-post-schema.json';
import connectionApiBase from './zod/connectionapi-base.json';
import connectionApiBulk from './zod/connectionapi-bulk.json';
import connectionApiReceiver from './zod/connectionapi-receiver.json';
import connectionApiSender from './zod/connectionapi-sender.json';
import connectionApiSingle from './zod/connectionapi-single.json';
import constraint from './zod/constraint-schema.json';
//import constraintsMqtt from './zod/constraints-schema-mqtt.json';
//import constraintsRtp from './zod/constraints-schema-rtp.json';
//import constraintsWebSocket from './zod/constraints-schema-websocket.json';
//import constraints from './zod/constraints-schema.json';
//import error from './zod/error.json';
import receiverResponse from './zod/receiver-response-schema.json';
import receiverStage from './zod/receiver-stage-schema.json';
//import receiverTransportFile from './zod/receiver-transport-file.json';
//import receiverTransportParams from './zod/receiver_transport_params.json';
//import receiverTransportParamsDash from './zod/receiver_transport_params_dash.json';
//import receiverTransportParamsExt from './zod/receiver_transport_params_ext.json';
//import receiverTransportParamsMqtt from './zod/receiver_transport_params_mqtt.json';
//import receiverTransportParamsRtp from './zod/receiver_transport_params_rtp.json';
//import receiverTransportParamsWebSocket from './zod/receiver_transport_params_websocket.json';
//import senderReceiverBase from './zod/sender-receiver-base.json';
import senderResponse from './zod/sender-response-schema.json';
import senderStage from './zod/sender-stage-schema.json';
import senderTransportParams from './zod/sender_transport_params.json';
//import senderTransportParamsDash from './zod/sender_transport_params_dash.json';
//import senderTransportParamsExt from './zod/sender_transport_params_ext.json';
//import senderTransportParamsMqtt from './zod/sender_transport_params_mqtt.json';
//import senderTransportParamsRtp from './zod/sender_transport_params_rtp.json';
//import senderTransportParamsWebSocket from './zod/sender_transport_params_websocket.json';
import transportTypeResponse from './zod/transporttype-response-schema.json';

export default {
    '/connection/v1.1': connectionApiBase,
    '/connection/v1.1/bulk': connectionApiBulk,
    '/connection/v1.1/bulk/senders': bulkSenderPost,
    '/connection/v1.1/bulk/receivers': bulkReceiverPost,
    '/connection/v1.1/single': connectionApiSingle,
    '/connection/v1.1/single/senders': connectionApiSender,
    '/connection/v1.1/single/senders/{sender_id}': senderStage,
    '/connection/v1.1/single/senders/{sender_id}/constraints': constraint,
    '/connection/v1.1/single/senders/{sender_id}/staged': senderStage,
    '/connection/v1.1/single/senders/{sender_id}/active': senderResponse,
    '/connection/v1.1/single/senders/{sender_id}/transportfile': senderTransportParams,
    '/connection/v1.1/single/senders/{sender_id}/transporttype': transportTypeResponse,
    '/connection/v1.1/single/receivers': connectionApiReceiver,
    '/connection/v1.1/single/receivers/{receiver_id}': receiverStage,
    '/connection/v1.1/single/receivers/{receiver_id}/constraints': constraint,
    '/connection/v1.1/single/receivers/{receiver_id}/staged': receiverStage,
    '/connection/v1.1/single/receivers/{receiver_id}/active': receiverResponse,
    '/connection/v1.1/single/receivers/{receiver_id}/transporttype': transportTypeResponse,
}