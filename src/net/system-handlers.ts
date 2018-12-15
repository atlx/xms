import NetworkHub, {NetPacketType, INetPacket} from "./network-hub";
import {$Auth} from "./net-packets";

export default class SystemHandlers {
    private readonly hub: NetworkHub;

    public constructor(hub: NetworkHub) {
        this.hub = hub;
    }

    public setup(): void {
        this.hub.handle(NetPacketType.Authenticate, (packet: INetPacket<$Auth>) => {
            
        });
    }
}