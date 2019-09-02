import {ActionType, ConnectionState} from "../store/store";
import {ICommand} from "../core/command";
import App from "../core/app";

export default abstract class MiscActions {
    public static setInputLocked(locked: boolean): void {
        if (typeof locked !== "boolean") {
            throw new Error("Expected 'locked' parameter to be a boolean");
        }

        App.store.dispatch({
            type: ActionType.SetInputLocked,
            payload: locked
        });
    }

    public static setPage(pageId: PageId): void {
        if (PageId[pageId] === undefined) {
            throw new Error("An invalid 'page' parameter was provided");
        }

        App.store.dispatch({
            type: ActionType.SetPage,
            payload: pageId
        });
    }

    public static setGuideVisible(visible: boolean): void {
        if (typeof visible !== "boolean") {
            throw new Error("Expected 'visible' parameter to be a boolean");
        }

        App.store.dispatch({
            type: ActionType.SetGuideVisible,
            payload: visible
        });
    }

    public static registerCommand(command: ICommand): void {
        if (typeof command !== "object" || command === null) {
            throw new Error("Expected 'command' parameter to be an object");
        }

        App.store.dispatch({
            type: ActionType.RegisterCommand,
            payload: command
        });
    }

    public static registerCommands(commands: ICommand[]): void {
        if (!Array.isArray(commands)) {
            throw new Error("Expected 'commands' parameter to be an array");
        }

        for (let i = 0; i < commands.length; i++) {
            MiscActions.registerCommand(commands[i]);
        }
    }

    public static addPing(ping: number): void {
        if (typeof ping !== "number" || ping < 0) {
            throw new Error("Expected 'ping' parameter to be a number higher or equal to 0");
        }

        App.store.dispatch({
            type: ActionType.AddPing,
            payload: ping
        });
    }

    public static setConnectionState(state: ConnectionState): void {
        if (ConnectionState[state] === undefined) {
            throw new Error("An invalid 'state' parameter was provided");
        }

        App.store.dispatch({
            type: ActionType.SetConnectionState,
            payload: state
        });
    }

    public static setLeftPanelVisible(visible: boolean): void {
        if (typeof visible !== "boolean") {
            throw new Error("Expected 'visible' parameter to be a boolean");
        }

        App.store.dispatch({
            type: ActionType.SetLeftPanelVisible,
            payload: visible
        });
    }
}
