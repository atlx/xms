import Plugin from "../plugin/plugin";
import IPluginContext from "../plugin/context";

export default class Net extends Plugin {
    public constructor() {
        super({
            name: "Messages",
            author: "Atlas",
            description: "Internal messages handler.",
            permissions: [PluginPermission.Messages],
            version: "1.0.0"
        });
    }

    public install(): void {

    }

    public enable(context: IPluginContext): void {
        if (context.msg !== undefined) {
            context.msg
            if (message.type === GatewayMsgType.Hello) {
                // TODO: Make use of the time difference & adjust time proxy for this user.
                const payload: HelloPayload = message.payload;

                if (!(store.getState() as IAppState).category.usersMap.has(message.sender)) {
                    UserActions.add(payload.user);
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
                    MessageActions.addToGeneral({
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
        }
    }
}
