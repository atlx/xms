import {ModelBased, UniqueId} from "./misc";
import {User} from "./user";
import {store} from "@/index";

export interface IUserMention {
    readonly id: UniqueId;

    readonly position: number;
}

export default class UserMention extends ModelBased<IUserMention> {
    public get user(): User {
        return store.state.user.users.get(this.model.id)!;
    }
}
