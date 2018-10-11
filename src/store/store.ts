import {createStore} from "redux";
import {Message, RoosterUserModel, UserState, RoosterCategoryModel, UniqueId, User} from "../types/types";

export enum ActionType {
    AddMessage = "ADD_MESSAGE",
    AddPartialMessage = "ADD_PARTIAL_MESSAGE",
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
    else if (action.type === ActionType.AddPartialMessage) {
        const newMessages: Message[] = [...state.messages];

        const message: Message = {
            id: Math.random().toString().replace(".", ""),
            authorAvatarUrl: "",
            authorName: "John Doe",
            systemMessage: false,
            text: action.payload.text,
            time: Date.now()
        };

        newMessages.push(message);

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
}

export const store: any = createStore(defaultReducer, {
    messages: [
        {
            id: "kiwejtwrtiet",
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

    usersMap: new Map()
} as any);