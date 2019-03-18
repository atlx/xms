import {IContextMenu} from "../models/misc";
import {store, ActionType} from "../store/store";

export default abstract class ContextMenuActions {
    public static show(menu: IContextMenu): void {
        store.dispatch({
            type: ActionType.ShowContextMenu,
            payload: menu
        });
    }

    /**
     * Hide visible context menu if applicable.
     */
    public static hide(): void {
        store.dispatch({
            type: ActionType.HideContextMenu
        });
    }
}
