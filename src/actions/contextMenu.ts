import {IContextMenu} from "@/models/misc";
import {ActionType} from "@/store/store";
import {store} from "@/index";

export default abstract class ContextMenuAction {
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
