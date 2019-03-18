import BroadcastGateway from "../net/broadcastGateway";
import {GatewayMsgType, MessagePayload} from "../net/gateway";
import {ITextMessage} from "../models/message";
import {IpAddress} from "../models/misc";
import {SpecialChannel} from "../models/channel";

export default class GatewayActions {
    private readonly gateway: BroadcastGateway;

    public constructor(gateway: BroadcastGateway) {
        this.gateway = gateway;
    }

    public broadcastMessage(message: ITextMessage): void {
        this.gateway.broadcast<MessagePayload>(GatewayMsgType.Message, {
            id: message.id,
            text: message.text,
            type: message.type
        });
    }

    public sendInsecureMessage(message: ITextMessage, destination: IpAddress): void {
        // TODO
    }

    public handleMessage(message: ITextMessage): void {
        if (message.channelId === SpecialChannel.General) {
            this.broadcastMessage(message);
        }
        else {
            // TODO: Insecure.
            this.sendInsecureMessage(message, message.senderAddress);
        }
    }
}
