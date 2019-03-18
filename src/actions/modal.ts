import {IModal} from "../models/misc";
import {store, ActionType} from "../store/store";

export default abstract class ModalActions {
    public static show(modal: IModal): void {
        store.dispatch({
            type: ActionType.ShowModal,
            payload: modal
        });
    }

    public static shift(): void {
        store.dispatch({
            type: ActionType.ShiftModal
        });
    }
}
