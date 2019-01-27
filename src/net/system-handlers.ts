import NetworkHub, {NetPacketType, INetPacket, requireAuth} from "../core/network-hub";
import {$Auth, $Message} from "./net-packets";
import {store, AppState} from "../store/store";
import {SpecialChannel, IMessage, MessageType, ChannelType} from "../types/types";
import Actions from "../store/actions";

export default class SystemHandlers {
    private readonly hub: NetworkHub;

    public constructor(hub: NetworkHub) {
        this.hub = hub;
    }

    public setup(): void {
        this.hub.handle<$Auth>(NetPacketType.Authenticate, (packet: INetPacket<$Auth>): void => {
            // TODO
        });

        // TODO: Validate packet
        this.hub.handle<$Message>(NetPacketType.Message, requireAuth, (packet: INetPacket<$Message>): void => {
            if (packet.payload.channelId === SpecialChannel.General) {
                Actions.addGeneralMessage<IMessage>({
                    // TODO
                    authorAvatarUrl: null,
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

            const state: AppState = store.getState();

            if (!state.channels.has(packet.sender)) {
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
                authorAvatarUrl: null,
                authorName: `User at ${packet.sender}`,
                senderAddress: packet.sender,
                sent: true,
                systemMessage: false
            }, packet.sender);
        });
    }
}
