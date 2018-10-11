import {User, UniqueId} from "../types/types";

// Generic
export enum GatewayMessageType {
    Hello,
    HelloAck,
    Goodbye,
    Message
}

export type GatewayMessage = {
    readonly type: GatewayMessageType;
    readonly payload: any;
    readonly sender: UniqueId;
    readonly time: number;
}

// Messages
export type GatewayHelloMessage = {
    readonly time: number;
    readonly user: User;
}

export type GatewayMessageMessage = {
    readonly id: UniqueId;
    readonly text: string;
}