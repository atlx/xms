import DbEntity from "../database/dbEntity";
import {UniqueId, IpAddress, IUserMention} from "./misc";
import UserMention from "./userMention";
import {SpecialChannel} from "./channel";

export enum MessageType {
    Text,
    Notice,
    Break
}

export interface IGenericMessage {
    readonly type: MessageType;
    readonly id: UniqueId;
    readonly channelId: UniqueId | SpecialChannel;
    readonly text: string;
    readonly time: number;
}

export interface IMessage extends IGenericMessage {
    readonly authorName: string;
    readonly authorAvatarHash?: string;
    readonly systemMessage: boolean;
    readonly sent: boolean;
    readonly senderAddress: IpAddress;
    readonly mentions: IUserMention[];
}

export interface INotice extends IGenericMessage {
    readonly style: NoticeStyle;
}

export interface IBreakMessage extends IGenericMessage {
    readonly important: boolean;
}

export enum NoticeStyle {
    Success,
    Warning,
    Error
}

export default class Message extends DbEntity<IGenericMessage> {
    public get mentions(): UserMention {
        // TODO
        return {} as any;
    }
}
