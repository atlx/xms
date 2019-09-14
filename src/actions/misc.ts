import {ActionType, ConnectionState} from "../store/store";
import app from "../index";
import PageId from "../core/pageId";

export default abstract class MiscAction {
    public static setInputLocked(locked: boolean): void {
        if (typeof locked !== "boolean") {
            throw new Error("Expected 'locked' parameter to be a boolean");
        }

        app.store.dispatch({
            type: ActionType.SetInputLocked,
            payload: locked
        });
    }

    public static setPage(pageId: PageId): void {
        if (PageId[pageId] === undefined) {
            throw new Error("An invalid 'page' parameter was provided");
        }

        app.store.dispatch({
            type: ActionType.SetPage,
            payload: pageId
        });
    }

    public static setGuideVisible(visible: boolean): void {
        if (typeof visible !== "boolean") {
            throw new Error("Expected 'visible' parameter to be a boolean");
        }

        app.store.dispatch({
            type: ActionType.SetGuideVisible,
            payload: visible
        });
    }

    public static addPing(ping: number): void {
        if (typeof ping !== "number" || ping < 0) {
            throw new Error("Expected 'ping' parameter to be a number higher or equal to 0");
        }

        app.store.dispatch({
            type: ActionType.AddPing,
            payload: ping
        });
    }

    public static setConnectionState(state: ConnectionState): void {
        if (ConnectionState[state] === undefined) {
            throw new Error("An invalid 'state' parameter was provided");
        }

        app.store.dispatch({
            type: ActionType.SetConnectionState,
            payload: state
        });
    }

    public static setLeftPanelVisible(visible: boolean): void {
        if (typeof visible !== "boolean") {
            throw new Error("Expected 'visible' parameter to be a boolean");
        }

        app.store.dispatch({
            type: ActionType.SetLeftPanelVisible,
            payload: visible
        });
    }
}
