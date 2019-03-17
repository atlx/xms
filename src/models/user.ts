import {UniqueId} from "./misc";

export enum UserState {
    Online,
    Away,
    Busy,
    Offline
}

export type User = {
    readonly id: UniqueId;
    readonly username: string;
    readonly status?: string;
    readonly avatarUrl?: string;
    readonly state: UserState;
    readonly createdTime: number;
}
