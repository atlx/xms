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

export type Writeable<T> = {
    -readonly [P in keyof T]-?: T[P];
};

export interface IUserMention {
    readonly id: UniqueId;
    readonly position: number;
}

export enum SpecialCategory {
    Connected = "Connected",
    Offline = "Offline"
}

export type IRosterCategory = {
    readonly id: UniqueId;
    readonly name: string;
    readonly users: UniqueId[];
}

export type UniqueId = string;
