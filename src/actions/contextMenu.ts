import {IContextMenu} from "../models/misc";
import {ActionType} from "../store/store";
import App from "../core/app";

export default abstract class ContextMenuActions {
    public static show(menu: IContextMenu): void {
        App.getStore().dispatch({
            type: ActionType.ShowContextMenu,
            payload: menu
        });
    }

    /**
     * Hide visible context menu if applicable.
     */
    public static hide(): void {
        App.getStore().dispatch({
            type: ActionType.HideContextMenu
        });
    }
}
