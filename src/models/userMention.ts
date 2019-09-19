import {ModelBased, UniqueId} from "./misc";
import {User} from "./user";
import {app} from "@/index";

export interface IUserMention {
    readonly id: UniqueId;

    readonly position: number;
}

export default class UserMention extends ModelBased<IUserMention> {
    public get user(): User {
        return app.store.state.user.users.get(this.model.id)!;
    }
}
