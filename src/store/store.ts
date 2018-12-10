import {createStore} from "redux";
import {Message, RoosterUserModel, UserState, RoosterCategoryModel, UniqueId, User, Channel} from "../types/types";

export enum ActionType {
    AddMessage = "ADD_MESSAGE",
    MarkMessageSent = "MARK_MESSAGE_SENT",
    AddUser = "ADD_USER"
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

    return state;
}

export type AppState = {
    readonly messages: Message[];
    readonly users: RoosterUserModel[];
    readonly usersMap: Map<UniqueId, User>;
    readonly categories: RoosterCategoryModel[];
    readonly channels: Channel[];
    
    activeChannel: Channel;
}

export const store: any = createStore(defaultReducer, {
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

    channels: [],

    activeChannel: null
} as any);