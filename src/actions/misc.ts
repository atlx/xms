import {Page} from "../models/misc";
import {store, ActionType, ConnectionState} from "../store/store";
import {ICommand} from "../core/command";

export default abstract class Actions {
    public static setInputLocked(locked: boolean): void {
        store.dispatch({
            type: ActionType.SetInputLocked,
            payload: locked
        });
    }

    public static setPage(page: Page): void {
        store.dispatch({
            type: ActionType.SetPage,
            payload: page
        });
    }

    public static setGuideVisible(visible: boolean): void {
        store.dispatch({
            type: ActionType.SetGuideVisible,
            payload: visible
        });
    }

    public static registerCommand(command: ICommand): void {
        store.dispatch({
            type: ActionType.RegisterCommand,
            payload: command
        });
    }

    public static registerCommands(commands: ICommand[]): void {
        for (let i = 0; i < commands.length; i++) {
            Actions.registerCommand(commands[i]);
        }
    }

    public static addPing(ping: number): void {
        store.dispatch({
            type: ActionType.AddPing,
            payload: ping
        });
    }

    public static setConnectionState(state: ConnectionState): void {
        store.dispatch({
            type: ActionType.SetConnectionState,
            payload: state
        });
    }

    public static setLeftPanelVisible(visible: boolean): void {
        store.dispatch({
            type: ActionType.SetLeftPanelVisible,
            payload: visible
        });
    }
}
