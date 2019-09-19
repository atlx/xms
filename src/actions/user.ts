import {User} from "@/models/user";
import {ActionType} from "@/store/store";
import app from "@/index";

export default abstract class UserAction {
    public static add(user: User): void {
        if (typeof user !== "object" || user === null) {
            throw new Error("Expected 'user' parameter to be an object");
        }

        app.store.dispatch({
            type: ActionType.AddUser,
            payload: user
        });
    }

    public static updateMe(me: Partial<User>): void {
        if (typeof me !== "object" || me === null) {
            throw new Error("Expected 'me' parameter to be an object");
        }

        app.store.dispatch({
            type: ActionType.UpdateMe,
            payload: me
        });
    }
}
