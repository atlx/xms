import {Reducer, ActionType} from "../store";
import {IGenericMessage, MessageType, IMessage} from "../../types/types";

const messageReducer: Reducer = (state, action) => {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case ActionType.AddGeneralMessage: {
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

        case ActionType.ClearMessages: {
            return {
                ...state,
                messages: []
            };
        }
    }

    return state;
}

export default messageReducer;