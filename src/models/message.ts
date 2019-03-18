import DbEntity from "../database/dbEntity";
import {UniqueId, IpAddress} from "./misc";
import UserMention, {IUserMention} from "./userMention";
import {SpecialChannel} from "./channel";

/**
 * Used to identify a generic message.
 */
export enum MessageType {
    Text,
    Notice,
    Break
}

/**
 * Defines the skeleton of all messages.
 */
export interface IGenericMessage {
    readonly type: MessageType;
    readonly id: UniqueId;
    readonly channelId: UniqueId | SpecialChannel;
    readonly text: string;
    readonly time: number;
}

/**
 * The standard text message sent in channels by users.
 */
export interface ITextMessage extends IGenericMessage {
    readonly authorName: string;
    readonly authorAvatarHash?: string;
    readonly systemMessage: boolean;
    readonly sent: boolean;
    readonly senderAddress: IpAddress;
    readonly mentions: IUserMention[];
}

/**
 * A simple message serving as a local announcement.
 */
export interface INotice extends IGenericMessage {
    readonly style: NoticeStyle;
}

export interface IBreakMessage extends IGenericMessage {
    readonly important: boolean;
}

export enum NoticeStyle {
    /**
     * A success notice, colored green.
     */
    Success,

    /**
     * A warning notice, colored yellow.
     */
    Warning,

    /**
     * An error notice, colored red.
     */
    Error
}

export default class Message extends DbEntity<ITextMessage> {
    public get mentions(): UserMention[] {
        return this.model.mentions.map((model: IUserMention) => {
            return new UserMention(model);
        });
    }
}
