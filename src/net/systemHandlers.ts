import NetworkHub, {NetPacketType, INetPacket} from "./networkHub";
import {SpecialChannel, ChannelType} from "@/models/channel";
import {ITextMessage, MessageType} from "@/models/message";
import MessageAction from "@/actions/message";
import ChannelAction from "@/actions/channel";
import {app} from "@/index";

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
                MessageAction.addToGeneral<ITextMessage>({
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

            if (!app.store.state.category.channels.has(packet.sender)) {
                ChannelAction.add({
                    id: packet.sender,
                    name: `(DM) User at ${packet.sender}`,
                    topic: "A DM channel",
                    type: ChannelType.Private,
                    notify: true
                });
            }

            // TODO: Use factory for message creation.
            MessageAction.add<ITextMessage>({
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
