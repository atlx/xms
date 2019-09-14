import {IContextMenu} from "../models/misc";
import {ActionType} from "../store/store";
import app from "../index";

export default abstract class ContextMenuAction {
    public static show(menu: IContextMenu): void {
        app.store.dispatch({
            type: ActionType.ShowContextMenu,
            payload: menu
        });
    }

    /**
     * Hide visible context menu if applicable.
     */
    public static hide(): void {
        app.store.dispatch({
            type: ActionType.HideContextMenu
        });
    }
}
