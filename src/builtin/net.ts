import Plugin from "../plugin/plugin";
import IPluginContext from "../plugin/context";
import NetworkEvent from "../net/networkEvent";
import {GatewayMsg, GatewayMsgType, MessagePayload} from "../net/gatewayEntities";
import MessageActions from "../actions/message";
import {AddressInfo} from "net";
import MessageEvent from "../net/messageEvent";
import App from "../core/app";

export default class Net extends Plugin {
    public constructor() {
        super({
            name: "Network",
            author: "Atlas",
            description: "Internal network handler.",
            version: "1.0.0"
        });
    }

    public install(): void {
        //
    }

    public enable(context: IPluginContext): void {
        if (context.net !== undefined && context.eventRouter !== undefined) {
            context.net.on(NetworkEvent.Data, (data: Buffer, sender: AddressInfo) => {
                const messageString: string = data.toString();

                // TODO: Debugging.
                console.log(`[BroadcastGateway.setupEvents] Received message string: ${messageString}`);

                if (messageString.startsWith("{") && messageString.endsWith("}")) {
                    const message: GatewayMsg<any> = JSON.parse(messageString);

                    context.eventRouter!.emit(MessageEvent.Receive, message);

                    // If the message was sent by the local client.
                    if (message.sender === App.me.id) {
                        if (message.type === GatewayMsgType.Message) {
                            const payload: MessagePayload = message.payload;

                            MessageActions.markSent(payload.id);
                        }
                        else if (message.type === GatewayMsgType.Heartbeat) {
                            const ping: number = Math.round(performance.now() - this.pingStart);

                            this.registerPing(ping);

                            if (!this.connectionVerified) {
                                this.connectionVerified = true;
                            }
                        }
                        else {
                            console.log(`[BroadcastGateway:Message] Unknown message type from self: ${message.type}`);
                        }

                        return;
                    }
                }
            });
        }
    }
}
