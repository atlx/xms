import {getState} from "../store/store";

export default class UserMention {
    protected readonly model: IUserMention;

    public constructor(model: IUserMention) {
        this.model = model;
    }

    public get user(): User {
        return getState().user.users.get(this.model.id);
    }
}
