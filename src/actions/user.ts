import {User} from "../models/user";
import {store, ActionType} from "../store/store";

export default abstract class UserActions {
    public static add(user: User): void {
        store.dispatch({
            type: ActionType.AddUser,
            payload: user
        });
    }

    public static updateMe(me: Partial<User>): void {
        store.dispatch({
            type: ActionType.UpdateMe,
            payload: me
        });
    }
}
