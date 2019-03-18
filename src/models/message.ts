import DbEntity from "../database/dbEntity";
import {UniqueId, IpAddress} from "./misc";
import UserMention, {IUserMention} from "./userMention";
import {SpecialChannel} from "./channel";
import MessageActions from "../actions/message";
import {getState} from "../store/store";

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
    /**
     * Mark the message as sent.
     */
    public markSent(): void {
        MessageActions.markSent(this.id);
    }

    /**
     * Add the message to the message map.
     * Returns false if message already exists,
     * otherwise returns true.
     */
    public add(): boolean {
        if (!this.exists) {
            MessageActions.add(this.model);

            return true;
        }

        return false;
    }

    /**
     * Add the message to the general channel.
     * Returns false if message already exists,
     * otherwise returns true.
     */
    public addToGeneral(): boolean {
        if (!this.exists) {
            MessageActions.addToGeneral(this.model);
        }

        return false;
    }

    /**
     * Whether the message has not been deleted and exists
     * in the messages map.
     */
    public get exists(): boolean {
        return getState().message.messages.has(this.id);
    }

    /**
     * Delete the message.
     */
    public delete(): void {
        MessageActions.delete(this.id);
    }

    /**
     * Retrieve the user mention objects present
     * in this message.
     */
    public get mentions(): UserMention[] {
        return this.model.mentions.map((model: IUserMention) =>
            new UserMention(model));
    }
}
