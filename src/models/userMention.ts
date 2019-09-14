import {ModelBased, UniqueId} from "./misc";
import {User} from "./user";
import App from "../core/app";

export interface IUserMention {
    readonly id: UniqueId;

    readonly position: number;
}

export default class UserMention extends ModelBased<IUserMention> {
    public get user(): User {
        return App.store.state.user.users.get(this.model.id)!;
    }
}
