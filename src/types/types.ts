export interface IChannel {
    readonly id: UniqueId;
    readonly type: ChannelType;
    readonly topic: string;
    readonly name: string;
    readonly notify: boolean;
}

export enum NoticeStyle {
    Success,
    Warning,
    Error
}

export interface IPosition {
    readonly x: number;
    readonly y: number;
}

export enum ContextMenuOptionType {
    Button
}

export interface IContextMenu {
    readonly title: string;
    readonly position: IPosition;
    readonly options: IContextMenuOption[];
}

export interface IContextMenuOption {
    readonly text: string;
    readonly disabled: boolean;
    readonly type: ContextMenuOptionType;
    readonly onClick: () => void;
}

export interface IModal {
    readonly title: string;
    readonly text: string;
    readonly onClose?: () => void;
}

export interface IAutoCompleteItem {
    readonly id: string;
    readonly name: string;
    readonly subtext?: string;
}

export enum Page {
    Init,
    Default
}

export type IpAddress = string;

export enum ChannelType {
    Public,
    Private
}

export enum SpecialChannel {
    General = "general"
}

export enum MessageType {
    Text,
    Notice
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
}

export interface INotice extends IGenericMessage {
    readonly style: NoticeStyle;
}

export enum UserState {
    Online,
    Away,
    Busy,
    Offline
}

export enum SpecialCategories {
    Connected = "connected",
    Offline = "offline"
}

export type User = {
    readonly id: UniqueId;
    readonly username: string;
    readonly status?: string;
    readonly avatarUrl?: string;
    readonly state: UserState;
    readonly createdTime: number;
}

export type IRosterCategory = {
    readonly id: UniqueId;
    readonly name: string;
    readonly users: UniqueId[];
}

export type UniqueId = string;
