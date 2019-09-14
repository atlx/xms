/**
 * Represents an extension/abstraction class over a model.
 */
export abstract class ModelBased<T> {
    protected model: T;

    public constructor(model: T) {
        this.model = model;
    }
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

export interface IGuideItem {
    readonly id: string;

    readonly name: string;

    readonly subtext?: string;
}

export type IpAddress = string;

export type Writeable<T> = {
    -readonly [P in keyof T]-?: T[P];
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
