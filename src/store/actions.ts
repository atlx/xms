import {PartialMessage} from "../types/types";
import {store, ActionType} from "./store";

export default abstract class Actions {
    public static addPartialMessage(partialMessage: PartialMessage): void {
        store.dispatch({
            type: ActionType.AddPartialMessage,
            payload: partialMessage
        });
    }
}