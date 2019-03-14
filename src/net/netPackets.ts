import {UniqueId, SpecialChannel} from "../models/models";

export type AuthToken = string;

export interface $Auth {
    readonly id: UniqueId;
    readonly token: AuthToken;
}

export interface $Message {
    readonly id: UniqueId;
    readonly channelId: UniqueId | SpecialChannel;
    readonly content: string;
    readonly time: number;
}
