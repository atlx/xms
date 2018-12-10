import {User, UniqueId, IGenericMessage} from "../types/types";
import {store, ActionType} from "./store";

export default abstract class Actions {
    public static addMessage<T extends IGenericMessage>(message: T): void {
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

    public static setActiveChannel(channelId: UniqueId): void {
        store.dispatch({
            type: ActionType.SetActiveChannel,
            payload: channelId
        });
    }

    public static setGeneralAsActiveChannel(): void {
        store.dispatch({
            type: ActionType.SetGeneralAsActiveChannel
        });
    }

    public static setInputLocked(locked: boolean): void {
        store.dispatch({
            type: ActionType.SetInputLocked,
            payload: locked
        });
    }
}