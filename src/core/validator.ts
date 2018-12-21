import {IUnsignedNetPacket, NetPacketType} from "./stdlib.rx/core/network-hub";

export default class Validator {
    public static netPacket(packet: IUnsignedNetPacket<any>): boolean {
        return packet.type === undefined || !NetPacketType[packet.type];
    }
}