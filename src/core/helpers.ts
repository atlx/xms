import {Map as ImmutableMap} from "immutable";
import {UniqueId} from "@/models/misc";

export type BasicMap<T> = ImmutableMap<UniqueId, T>;

export type PromiseOr<T = void> = Promise<T> | T;

export interface IDisposable {
    dispose(): void;
}

export type Callback<T = void> = (...args: any[]) => T;

export type AppRenderer = () => JSX.Element;
