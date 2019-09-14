import {UniqueId} from "./misc";

export enum ChannelType {
    Public,
    
    Private
}

export enum SpecialChannel {
    General = "general"
}

export interface IChannel {
    readonly id: UniqueId;

    readonly type: ChannelType;

    readonly topic: string;

    readonly name: string;

    readonly notify: boolean;
}
