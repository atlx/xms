import {Message} from "../types/types";
import BroadcastGateway from "../net/broadcast-gateway";
import {GatewayMessageType, GatewayMessageMessage} from "../net/gateway";

export default class GatewayActions {
    private readonly gateway: BroadcastGateway;

    public constructor(gateway: BroadcastGateway) {
        this.gateway = gateway;
    }

    public sendMessage(message: Message): void {
        this.gateway.emit(GatewayMessageType.Message, {
            id: message.id,
            text: message.text
        } as GatewayMessageMessage);
    }
}