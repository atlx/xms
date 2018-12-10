export type Channel = {
    readonly id: UniqueId;
    readonly type: ChannelType;
    readonly topic: string;
    readonly name: string;
}

export enum Page {
    Init,
    Default
}

export enum ChannelType {
    Public,
    Text
}

export enum MessageType {
    Text,
    Notice
}

export interface IGenericMessage {
    readonly type: MessageType;
    readonly id: UniqueId;
    readonly channelId: UniqueId;
    readonly text: string;
    readonly time: number;
}

export interface IMessage extends IGenericMessage {
    readonly authorName: string;
    readonly authorAvatarUrl: string;
    readonly systemMessage: boolean;
    readonly sent: boolean;
}

export interface INotice extends IGenericMessage {
    readonly text: string;
}

export enum UserState {
    Online,
    Away,
    Busy,
    Offline
}

export interface User extends RoosterUserModel {
    readonly createdTime: number;
}

export type RoosterUserModel = {
    readonly id: UniqueId;
    readonly username: string;
    readonly status?: string;
    readonly avatarUrl: string;
    readonly state: UserState;
    readonly categoryId: UniqueId;
}

export type RoosterCategoryModel = {
    readonly id: UniqueId;
    readonly name: string;
}

export type UniqueId = string;