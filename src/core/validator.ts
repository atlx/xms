import {IUnverifiedNetPacket, NetPacketType} from "@/net/networkHub";

export default class Validator {
    public static netPacket(packet: IUnverifiedNetPacket<any>): boolean {
        return packet.type === undefined || NetPacketType[packet.type as any] === undefined;
    }
}
