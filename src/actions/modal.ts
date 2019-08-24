import {IModal} from "../models/misc";
import {ActionType} from "../store/store";
import App from "../core/app";

export default abstract class ModalActions {
    public static show(modal: IModal): void {
        if (typeof modal !== "object" || modal === null) {
            throw new Error("Expected 'modal' parameter to be an object");
        }

        App.getStore().dispatch({
            type: ActionType.ShowModal,
            payload: modal
        });
    }

    public static shift(): void {
        App.getStore().dispatch({
            type: ActionType.ShiftModal
        });
    }
}
