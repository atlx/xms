import Gateway from "../net/gateway";
import {GatewayMsgType, MessagePayload} from "../net/gatewayEntities";
import {ITextMessage} from "../models/message";
import {IpAddress} from "../models/misc";
import {SpecialChannel} from "../models/channel";

export default class GatewayAction {
    private readonly gateway: Gateway;

    public constructor(gateway: Gateway) {
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
