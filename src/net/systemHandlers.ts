import NetworkHub, {NetPacketType, INetPacket} from "../core/networkHub";
import {store, IAppState} from "../store/store";
import {SpecialChannel, IMessage, MessageType, ChannelType} from "../types/types";
import Actions from "../store/actions";

export default class SystemHandlers {
    private readonly net: NetworkHub;

    public constructor(hub: NetworkHub) {
        this.net = hub;
    }

    public setup(): void {
        this.net.on(NetPacketType.Authenticate, () => {
            // TODO
        });

        // TODO: Validate packet
        this.net.authOn(NetPacketType.Message, (packet: INetPacket): void => {
            if (packet.payload.channelId === SpecialChannel.General) {
                Actions.addGeneralMessage<IMessage>({
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
                    type: MessageType.Text
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

            Actions.addMessage<IMessage>({
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
                systemMessage: false
            }, packet.sender);
        });
    }
}
