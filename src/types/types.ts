export type Channel = {
    readonly id: UniqueId;
    readonly type: ChannelType;
    readonly topic: string;
    readonly name: string;
}

export enum ChannelType {
    Text
}

export type Message = {
    readonly id: UniqueId;
    readonly channelId: UniqueId;
    readonly authorName: string;
    readonly text: string;
    readonly time: number;
    readonly authorAvatarUrl: string;
    readonly systemMessage: boolean;
    readonly sent: boolean;
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