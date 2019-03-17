import BroadcastGateway from "../net/broadcastGateway";
import {GatewayMsgType, MessagePayload} from "../net/gateway";
import {IMessage} from "../models/message";
import {IpAddress} from "../models/misc";
import {SpecialChannel} from "../models/channel";

export default class GatewayActions {
    private readonly gateway: BroadcastGateway;

    public constructor(gateway: BroadcastGateway) {
        this.gateway = gateway;
    }

    public broadcastMessage(message: IMessage): void {
        this.gateway.broadcast<MessagePayload>(GatewayMsgType.Message, {
            id: message.id,
            text: message.text,
            type: message.type
        });
    }

    public sendInsecureMessage(message: IMessage, destination: IpAddress): void {
        // TODO
    }

    public handleMessage(message: IMessage): void {
        if (message.channelId === SpecialChannel.General) {
            this.broadcastMessage(message);
        }
        else {
            // TODO: Insecure.
            this.sendInsecureMessage(message, message.senderAddress);
        }
    }
}
