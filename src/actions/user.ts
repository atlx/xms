import {User} from "../models/user";
import {store, ActionType} from "../store/store";

export default abstract class UserActions {
    public static add(user: User): void {
        if (typeof user !== "object" || user === null) {
            throw new Error("Expected 'user' parameter to be an object");
        }

        store.dispatch({
            type: ActionType.AddUser,
            payload: user
        });
    }

    public static updateMe(me: Partial<User>): void {
        if (typeof me !== "object" || me === null) {
            throw new Error("Expected 'me' parameter to be an object");
        }

        store.dispatch({
            type: ActionType.UpdateMe,
            payload: me
        });
    }
}
