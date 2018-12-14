import {createStore, Store, applyMiddleware} from "redux";
import {IMessage, IRoosterCategory, UniqueId, User, IChannel, ChannelType, IGenericMessage, MessageType, Page, IModal, IContextMenu} from "../types/types";
import CommandHandler from "../core/command-handler";
import {createLogger} from "redux-logger";
import {Map as ImmutableMap} from "immutable";

export enum ActionType {
    AddMessage = "ADD_MESSAGE",
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
    AddChannel = "ADD_CHANNEL"
}

function defaultReducer(state: AppState, action: any): any {
    switch (action.type) {
        case ActionType.AddMessage: {
            const newMessages: IGenericMessage[] = [...state.messages];

            newMessages.push(action.payload);

            return {
                ...state,
                messages: newMessages
            };
        }

        case ActionType.MarkMessageSent: {
            const newMessages: IGenericMessage[] = [...state.messages];

            let messageFound: boolean = false;

            for (let i = 0; i < newMessages.length; i++) {
                if (newMessages[i].type !== MessageType.Text) {
                    continue;
                }

                const message: IMessage = newMessages[i] as IMessage;

                if (message.id === action.payload && !message.sent) {
                    (newMessages[i] as any) = {
                        ...newMessages[i],
                        sent: true
                    };

                    messageFound = true;

                    break;
                }
            }

            if (!messageFound) {
                throw new Error(`[Store:MarkMessageSent] Message with id '${action.payload}' was not found`);
            }

            return {
                ...state,
                messages: newMessages
            };
        }

        case ActionType.SetActiveChannel: {
            if (!action.payload || typeof (action.payload) !== "string") {
                throw new Error("Invalid payload");
            }
            else if (!state.channels.has(action.payload)) {
                throw new Error("Attempting to set a channel that does not exist within the application state");
            }

            return {
                ...state,
                activeChannel: state.channels.get(action.payload)
            };
        }

        case ActionType.SetGeneralAsActiveChannel: {
            return {
                ...state,
                activeChannel: state.channels.get("general")
            };
        }

        case ActionType.SetInputLocked: {
            return {
                ...state,
                inputLocked: action.payload
            };
        }

        case ActionType.SetPage: {
            // TODO: Verify page type is valid
            return {
                ...state,
                page: action.payload
            };
        }

        case ActionType.SetAutoCompleteVisible: {
            return {
                ...state,
                autoCompleteVisible: action.payload
            };
        }

        case ActionType.RegisterCommand: {
            return {
                ...state,
                commandHandler: state.commandHandler.register(action.payload)
            };
        }

        case ActionType.ShowModal: {
            return {
                ...state,
                modals: [...state.modals, action.payload]
            };
        }

        case ActionType.ShiftModal: {
            const modals: IModal[] = [...state.modals];

            modals.shift();

            return {
                ...state,
                modals
            };
        }

        case ActionType.ClearMessages: {
            return {
                ...state,
                messages: []
            };
        }

        case ActionType.UpdateMe: {
            return {
                ...state,

                me: {
                    ...action.payload
                }
            };
        }

        case ActionType.AddUser: {
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        }

        case ActionType.AddCategory: {
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        }

        case ActionType.AddUserToCategory: {
            const categories: IRoosterCategory[] = [...state.categories];
            const index: number = categories.findIndex((category: IRoosterCategory) => category.id === action.payload.category);
    
            categories[index].users.push(action.payload.userId);
    
            return {
                ...state,
                categories
            };
        }

        case ActionType.ShowContextMenu: {
            return {
                ...state,
                contextMenu: action.payload
            };
        }

        case ActionType.HideContextMenu: {
            return {
                ...state,
                contextMenu: null
            };
        }

        case ActionType.AddChannel: {
            return {
                ...state,
                channels: state.channels.set(action.payload.id, action.payload)
            };
        }
    }

    return state;
}

export type AppState = {
    readonly messages: IGenericMessage[];
    readonly users: User[];
    readonly usersMap: Map<UniqueId, User>;
    readonly categories: IRoosterCategory[];
    readonly channels: Map<UniqueId, IChannel>;
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

export const store: Store = createStore(defaultReducer, {
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