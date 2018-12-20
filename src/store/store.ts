import {createStore, Store, applyMiddleware, combineReducers} from "redux";
import {IRoosterCategory, UniqueId, User, IChannel, ChannelType, IGenericMessage, Page, IModal, IContextMenu} from "../types/types";
import CommandHandler from "../core/command-handler";
import {createLogger} from "redux-logger";
import {Map as ImmutableMap} from "immutable";
import messageReducer from "./reducers/modal";
import categoryReducer from "./reducers/category";
import channelReducer from "./reducers/channel";
import commandReducer from "./reducers/command";
import contextMenuReducer from "./reducers/context-menu";
import miscReducer from "./reducers/misc";
import userReducer from "./reducers/user";
import modalReducer from "./reducers/modal";

export enum ActionType {
    AddGeneralMessage = "ADD_GENERAL_MESSAGE",
    MarkMessageSent = "MARK_MESSAGE_SENT",
    AddUser = "ADD_USER",
    SetActiveChannel = "SET_ACTIVE_CHANNEL",
    SetGeneralAsActiveChannel = "SET_GENERAL_AS_ACTIVE_CHANNEL",
    SetInputLocked = "SET_INPUT_LOCKED",
    SetPage = "SET_PAGE",
    SetAutoCompleteVisible = "SET_AUTOCOMPLETE_VISIBLE",
    RegisterCommand = "REGISTER_COMMAND",
    ShowModal = "SHOW_MODAL",
    ShiftModal = "SHIFT_MODAL",
    ClearMessages = "CLEAR_MESSAGES",
    UpdateMe = "UPDATE_ME",
    AddCategory = "ADD_CATEGORY",
    AddUserToCategory = "ADD_USER_TO_CATEGORY",
    ShowContextMenu = "SHOW_CONTEXT_MENU",
    HideContextMenu = "HIDE_CONTEXT_MENU",
    AddChannel = "ADD_CHANNEL",
    AddMessage = "ADD_MESSAGE",
    RemoveChannel = "REMOVE_CHANNEL",
    RenameChannel = "RENAME_CHANNEL",
    SetChannelNotify = "SET_CHANNEL_NOTIFY",
    SetChannelTopic = "SET_CHANNEL_TOPIC",
    RenameCategory = "RENAME_CATEGORY",
    UpdateUser = "UPDATE_USER"
}

export type Reducer = (state: AppState | undefined, action: Action<any>) => AppState | undefined;

export type Action<T extends object> = {
    readonly type: ActionType;
    readonly payload?: T;
}

export type AppState = {
    readonly messages: IGenericMessage[];
    readonly users: User[];
    readonly usersMap: Map<UniqueId, User>;
    readonly categories: IRoosterCategory[];
    readonly channels: ImmutableMap<UniqueId, IChannel>;
    readonly inputLocked: boolean;
    readonly activeChannel: IChannel;
    readonly page: Page;
    readonly autoCompleteVisible: boolean;
    readonly commandHandler: CommandHandler;
    readonly modals: IModal[];
    readonly me: User | null;
    readonly contextMenu: IContextMenu | null;
}

const logger = createLogger({
    //
});

export const store: Store = createStore(combineReducers({
    category: categoryReducer,
    channel: channelReducer,
    command: commandReducer,
    contextMenu: contextMenuReducer,
    message: messageReducer,
    misc: miscReducer,
    modal: modalReducer,
    user: userReducer
}), {
    messages: [],
    users: [],
    categories: [],
    usersMap: new Map(),

    // General channel
    channels: ImmutableMap({
        general:
        {
            id: "general",
            name: "General",
            topic: "A public channel for everyone connected",
            type: ChannelType.Public
        }
    }),

    activeChannel: null,
    inputLocked: true,
    page: Page.Init,
    autoCompleteVisible: false,
    commandHandler: new CommandHandler(),
    modals: [],
    me: null,
    contextMenu: null
} as any, applyMiddleware(logger));