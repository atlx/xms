import {User, UniqueId, MessageType} from "../models/models";

// Generic
export enum GatewayMsgType {
    Hello,
    HelloAck,
    Goodbye,
    Message,
    Heartbeat
}

export type GatewayMsg<T> = {
    readonly type: GatewayMsgType;
    readonly payload: T;
    readonly sender: UniqueId;
    readonly time: number;
}

// Messages
export type HelloPayload = {
    readonly time: number;
    readonly user: User;
}

export type HeartbeatPayload = {
    //
}

export type MessagePayload = {
    readonly id: UniqueId;
    readonly type: MessageType;
    readonly text: string;
}
