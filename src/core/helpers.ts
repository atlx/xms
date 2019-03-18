import {Map as ImmutableMap} from "immutable";
import {UniqueId} from "../models/misc";

export type BasicMap<T> = ImmutableMap<UniqueId, T>;
