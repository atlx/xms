import {User, Message, UniqueId} from "../types/types";
import {store, ActionType} from "./store";

export default abstract class Actions {
    public static addMessage(message: Message): void {
        store.dispatch({
            type: ActionType.AddMessage,
            payload: message
        });
    }

    public static markMessageSent(messageId: UniqueId): void {
        store.dispatch({
            type: ActionType.MarkMessageSent,
            payload: messageId
        });
    }

    public static addUser(user: User): void {
        store.dispatch({
            type: ActionType.AddUser,
            payload: user
        });
    }
}