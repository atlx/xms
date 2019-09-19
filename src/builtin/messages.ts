import Plugin from "@/plugin/plugin";
import IPluginContext from "@/plugin/context";
import Message, {ITextMessage} from "@/models/message";
import MessageEvent from "@/net/messageEvent";
import {GatewayMsgType, HelloPayload, MessagePayload} from "@/net/gatewayEntities";
import {IAppState} from "@/store/store";
import UserAction from "@/actions/user";
import MessageAction from "@/actions/message";
import {SpecialChannel} from "@/models/channel";

export default class Messages extends Plugin {
    public constructor() {
        super({
            name: "Messages",
            author: "Atlas",
            description: "Internal messages handler.",
            version: "1.0.0"
        });
    }

    public install(): void {
        //
    }

    public enable(context: IPluginContext): void {
        if (context.messages !== undefined) {
            context.messages.on(MessageEvent.Receive, (message: Message) => {
                if (message.type === GatewayMsgType.Hello) {
                    // TODO: Make use of the time difference & adjust time proxy for this user.
                    const payload: HelloPayload = message.payload;

                    if (!(store.getState() as IAppState).category.usersMap.has(message.sender)) {
                        UserAction.add(payload.user);
                    }
                }
                // Handle incoming message.
                else if (message.type === GatewayMsgType.Message) {
                    const payload: MessagePayload = message.payload;

                    if ((store.getState() as IAppState).category.usersMap.has(message.sender)) {
                        // TODO
                    }
                    else {
                        // TODO: Fix.
                        // TODO: Verify type and data.
                        MessageAction.addToGeneral({
                            // TODO: A way to safely identify an unknown sender, or is it not required?
                            authorAvatarHash: "",
                            authorName: "Unknown",
                            id: "unknown",
                            systemMessage: false,
                            text: payload.text,
                            sent: true,

                            // TODO: Time should be provided by sender.
                            time: Date.now(),
                            channelId: SpecialChannel.General,
                            type: payload.type
                        } as ITextMessage);
                    }
                }
                else {
                    console.log(`[BroadcastGateway] Received an invalid message from '${sender.address}' with type '${message.type}'`)
                }
            });
        }
    }
}
