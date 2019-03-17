import {getState} from "../store/store";
import {ModelBased, UniqueId} from "./misc";
import {User} from "./user";

export interface IUserMention {
    readonly id: UniqueId;
    readonly position: number;
}

export default class UserMention extends ModelBased<IUserMention> {
    public get user(): User {
        return getState().user.users.get(this.model.id)!;
    }
}
