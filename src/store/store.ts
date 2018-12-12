import {createStore, Store, applyMiddleware} from "redux";
import {IMessage, RoosterUserModel, UserState, RoosterCategoryModel, UniqueId, User, IChannel, ChannelType, IGenericMessage, MessageType, INotice, Page, IModal} from "../types/types";
import CommandHandler from "../core/command-handler";
import {createLogger} from "redux-logger";

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
    ClearMessages = "CLEAR_MESSAGES"
}

function defaultReducer(state: AppState, action: any): any {
    if (action.type === ActionType.AddMessage) {
        const newMessages: IGenericMessage[] = [...state.messages];

        newMessages.push(action.payload);

        return {
            ...state,
            messages: newMessages
        };
    }
    else if (action.type === ActionType.MarkMessageSent) {
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
    else if (action.type === ActionType.SetActiveChannel) {
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
    else if (action.type === ActionType.SetGeneralAsActiveChannel) {
        return {
            ...state,
            activeChannel: state.channels.get("general")
        };
    }
    else if (action.type === ActionType.SetInputLocked) {
        return {
            ...state,
            inputLocked: action.payload
        };
    }
    else if (action.type === ActionType.SetPage) {
        // TODO: Verify page type is valid
        return {
            ...state,
            page: action.payload
        };
    }
    else if (action.type === ActionType.SetAutoCompleteVisible) {
        return {
            ...state,
            autoCompleteVisible: action.payload
        };
    }
    else if (action.type === ActionType.RegisterCommand) {
        return {
            ...state,
            commandHandler: state.commandHandler.register(action.payload)
        };
    }
    else if (action.type === ActionType.ShowModal) {
        return {
            ...state,
            modals: [...state.modals, action.payload]
        };
    }
    else if (action.type === ActionType.ShiftModal) {
        const modals: IModal[] = [...state.modals];

        modals.shift();

        return {
            ...state,
            modals
        };
    }
    else if (action.type === ActionType.ClearMessages) {
        return {
            ...state,
            messages: []
        };
    }

    return state;
}

export type AppState = {
    readonly messages: IGenericMessage[];
    readonly users: RoosterUserModel[];
    readonly usersMap: Map<UniqueId, User>;
    readonly categories: RoosterCategoryModel[];
    readonly channels: Map<UniqueId, IChannel>;
    readonly inputLocked: boolean;
    readonly activeChannel: IChannel;
    readonly page: Page;
    readonly autoCompleteVisible: boolean;
    readonly commandHandler: CommandHandler;
    readonly modals: IModal[];
}

const logger = createLogger({
    //
});

export const store: Store = createStore(defaultReducer, {
    messages: [],

    users: [
        {
            id: "giit3i4t3t",
            username: "John Doe",
            status: undefined,
            state: UserState.Online,
            avatarUrl: "",
            categoryId: "devs"
        }
    ],

    categories: [
        {
            name: "Developers",
            id: "devs"
        }
    ],

    usersMap: new Map(),

    // General channel
    channels: new Map().set("general",
        {
            id: "general",
            name: "General",
            topic: "A public channel for everyone connected",
            type: ChannelType.Public
        }
    ),

    activeChannel: null,
    inputLocked: true,
    page: Page.Init,
    autoCompleteVisible: false,
    commandHandler: new CommandHandler(),
    modals: []
} as any, applyMiddleware(logger));