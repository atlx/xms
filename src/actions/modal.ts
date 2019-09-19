import {IModal} from "@/models/misc";
import {ActionType} from "@/store/store";
import app from "@/index";

export default abstract class ModalAction {
    public static show(modal: IModal): void {
        if (typeof modal !== "object" || modal === null) {
            throw new Error("Expected 'modal' parameter to be an object");
        }

        app.store.dispatch({
            type: ActionType.ShowModal,
            payload: modal
        });
    }

    public static shift(): void {
        app.store.dispatch({
            type: ActionType.ShiftModal
        });
    }
}
