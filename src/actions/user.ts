import {User} from "../models/user";
import {ActionType} from "../store/store";
import App from "../core/app";

export default abstract class UserActions {
    public static add(user: User): void {
        if (typeof user !== "object" || user === null) {
            throw new Error("Expected 'user' parameter to be an object");
        }

        App.getStore().dispatch({
            type: ActionType.AddUser,
            payload: user
        });
    }

    public static updateMe(me: Partial<User>): void {
        if (typeof me !== "object" || me === null) {
            throw new Error("Expected 'me' parameter to be an object");
        }

        App.getStore().dispatch({
            type: ActionType.UpdateMe,
            payload: me
        });
    }
}
