import {IMessage} from "../types/types";
import BroadcastGateway from "../net/broadcast-gateway";
import {GatewayMsgType, MessagePayload} from "../net/gateway";

export default class GatewayActions {
    private readonly gateway: BroadcastGateway;

    public constructor(gateway: BroadcastGateway) {
        this.gateway = gateway;
    }

    public sendMessage(message: IMessage): void {
        this.gateway.emit<MessagePayload>(GatewayMsgType.Message, {
            id: message.id,
            text: message.text,
            type: message.type
        });
    }
}