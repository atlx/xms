import {createStore, Store} from "redux";
import {Message, RoosterUserModel, UserState, RoosterCategoryModel, UniqueId, User, Channel, ChannelType} from "../types/types";

export enum ActionType {
    AddMessage = "ADD_MESSAGE",
    MarkMessageSent = "MARK_MESSAGE_SENT",
    AddUser = "ADD_USER",
    SetActiveChannel = "SET_ACTIVE_CHANNEL",
    SetGeneralAsActiveChannel = "SET_GENERAL_AS_ACTIVE_CHANNEL"
}

function defaultReducer(state: AppState, action: any): any {
    if (action.type === ActionType.AddMessage) {
        const newMessages: Message[] = [...state.messages];

        newMessages.push(action.payload);

        return {
            ...state,
            messages: newMessages
        };
    }
    else if (action.type === ActionType.MarkMessageSent) {
        const newMessages: Message[] = [...state.messages];

        let messageFound: boolean = false;

        for (let i = 0; i < newMessages.length; i++) {
            if (newMessages[i].id === action.payload && !newMessages[i].sent) {
                newMessages[i] = {
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

    return state;
}

export type AppState = {
    readonly messages: Message[];
    readonly users: RoosterUserModel[];
    readonly usersMap: Map<UniqueId, User>;
    readonly categories: RoosterCategoryModel[];
    readonly channels: Map<UniqueId, Channel>;

    activeChannel: Channel;
}

export const store: Store = createStore(defaultReducer, {
    messages: [
        {
            id: "kiwejtwrtiet",
            channelId: "ff",
            authorName: "John Doe",
            time: 0,
            text: "Hello world",
            authorAvatarUrl: "",
            systemMessage: false
        }
    ],

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

    activeChannel: null
} as any);