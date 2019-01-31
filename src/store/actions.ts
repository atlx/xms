import {User, UniqueId, IGenericMessage, Page, IModal, IRosterCategory, IContextMenu, IChannel, SpecialCategory} from "../types/types";
import {store, ActionType, ConnectionState} from "./store";
import {ICommand} from "../core/command";

export default abstract class Actions {
    public static addGeneralMessage<T extends IGenericMessage>(message: T): void {
        store.dispatch({
            type: ActionType.AddGeneralMessage,
            payload: message
        });
    }

    public static markMessageSent(messageId: UniqueId): void {
        store.dispatch({
            type: ActionType.MarkMessageSent,
            payload: messageId
        });
    }

    public static addUser(user: User): void {
        store.dispatch({
            type: ActionType.AddUser,
            payload: user
        });
    }

    public static setActiveChannel(channelId: UniqueId): void {
        store.dispatch({
            type: ActionType.SetActiveChannel,
            payload: channelId
        });
    }

    public static setGeneralAsActiveChannel(): void {
        store.dispatch({
            type: ActionType.SetGeneralAsActiveChannel
        });
    }

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

    public static setAutoCompleteVisible(visible: boolean): void {
        store.dispatch({
            type: ActionType.SetAutoCompleteVisible,
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

    public static showModal(modal: IModal): void {
        store.dispatch({
            type: ActionType.ShowModal,
            payload: modal
        });
    }

    public static shiftModal(): void {
        store.dispatch({
            type: ActionType.ShiftModal
        });
    }

    public static clearMessages(): void {
        store.dispatch({
            type: ActionType.ClearMessages
        });
    }

    public static updateMe(me: Partial<User>): void {
        store.dispatch({
            type: ActionType.UpdateMe,
            payload: me
        });
    }

    public static addCategory(category: IRosterCategory): void {
        store.dispatch({
            type: ActionType.AddCategory,
            payload: category
        });
    }

    public static addUserToCategory(userId: UniqueId, category: string | SpecialCategory): void {
        store.dispatch({
            type: ActionType.AddUserToCategory,

            payload: {
                userId,
                category
            }
        });
    }

    public static showContextMenu(menu: IContextMenu): void {
        store.dispatch({
            type: ActionType.ShowContextMenu,
            payload: menu
        });
    }

    public static hideContextMenu(): void {
        store.dispatch({
            type: ActionType.HideContextMenu
        });
    }

    public static addChannel(channel: IChannel): void {
        store.dispatch({
            type: ActionType.AddChannel,
            payload: channel
        });
    }

    public static addMessage<T extends IGenericMessage>(message: T, channelId: UniqueId): void {
        store.dispatch({
            type: ActionType.AddMessage
        });
    }

    public static renameChannel(channelId: UniqueId, name: string): void {
        store.dispatch({
            type: ActionType.RenameChannel,
            payload: {
                channelId,
                name
            }
        });
    }

    public static setChannelTopic(channelId: UniqueId, topic: string): void {
        store.dispatch({
            type: ActionType.SetChannelTopic,
            payload: {
                channelId,
                topic
            }
        });
    }

    public static removeChannel(channelId: UniqueId): void {
        store.dispatch({
            type: ActionType.RemoveChannel,
            payload: channelId
        });
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
