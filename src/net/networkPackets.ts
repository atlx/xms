import {UniqueId} from "../models/misc";
import {SpecialChannel} from "../models/channel";

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
