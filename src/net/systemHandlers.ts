import NetworkHub, {NetPacketType, INetPacket} from "../core/networkHub";
import {store, IAppState} from "../store/store";
import Actions from "../store/actions";
import {SpecialChannel, ChannelType} from "../models/channel";
import {IMessage, MessageType} from "../models/message";

export default class SystemHandlers {
    private readonly net: NetworkHub;

    public constructor(hub: NetworkHub) {
        this.net = hub;
    }

    public setup(): void {
        this.net.on(NetPacketType.Authenticate, () => {
            // TODO
        });

        // TODO: Validate packet.
        this.net.authOn(NetPacketType.Message, (packet: INetPacket): void => {
            if (packet.payload.channelId === SpecialChannel.General) {
                // TODO: Use factory for message creation.
                Actions.appendMessageToGeneral<IMessage>({
                    // TODO
                    authorAvatarHash: undefined,
                    authorName: `User at ${packet.sender}`,

                    channelId: SpecialChannel.General,
                    id: packet.payload.id,
                    senderAddress: packet.sender,
                    sent: true,
                    systemMessage: false,
                    text: packet.payload.content,
                    time: packet.payload.time,
                    type: MessageType.Text,
                    
                    // TODO
                    mentions: []
                });

                return;
            }

            const state: IAppState = store.getState();

            if (!state.category.channels.has(packet.sender)) {
                Actions.addChannel({
                    id: packet.sender,
                    name: `(DM) User at ${packet.sender}`,
                    topic: "A DM channel",
                    type: ChannelType.Private,
                    notify: true
                });
            }

            // TODO: Use factory for message creation.
            Actions.appendMessage<IMessage>({
                channelId: packet.sender,
                id: packet.payload.id,
                text: packet.payload.content,
                time: packet.payload.time,
                type: MessageType.Text,

                // TODO
                authorAvatarHash: undefined,
                authorName: `User at ${packet.sender}`,
                senderAddress: packet.sender,
                sent: true,
                systemMessage: false,

                // TODO
                mentions: []
            });
        });
    }
}
