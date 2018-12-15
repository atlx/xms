import {UniqueId} from "../types/types";

export type AuthToken = string;

export interface $Auth {
    readonly id: UniqueId;
    readonly token: AuthToken;
}