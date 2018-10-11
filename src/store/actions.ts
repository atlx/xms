import {PartialMessage, User, Message} from "../types/types";
import {store, ActionType} from "./store";

export default abstract class Actions {
    public static addPartialMessage(partialMessage: PartialMessage): void {
        store.dispatch({
            type: ActionType.AddPartialMessage,
            payload: partialMessage
        });
    }

    public static addMessage(message: Message): void {
        store.dispatch({
            type: ActionType.AddMessage,
            payload: message
        });
    }

    public static addUser(user: User): void {
        store.dispatch({
            type: ActionType.AddUser,
            payload: user
        });
    }
}