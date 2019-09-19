import {IModal} from "@/models/misc";
import {ActionType} from "@/store/store";
import {store} from "@/index";

export default abstract class ModalAction {
    public static show(modal: IModal): void {
        if (typeof modal !== "object" || modal === null) {
            throw new Error("Expected 'modal' parameter to be an object");
        }

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
