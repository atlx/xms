import {getState} from "../store/store";
import {IUserMention} from "./misc";
import {User} from "./user";

export default class UserMention {
    protected readonly model: IUserMention;

    public constructor(model: IUserMention) {
        this.model = model;
    }

    public get user(): User {
        return getState().user.users.get(this.model.id)!;
    }
}
