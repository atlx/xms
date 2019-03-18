import {Reducer, ActionType, IAppStateMessage, InitialState} from "../store/store";
import {IGenericMessage, IMessage, MessageType} from "../models/message";
import {Writeable} from "../models/misc";

const messageReducer: Reducer<IAppStateMessage> = (state, action) => {
    // Return default initial state for this reducer.
    if (!state) {
        return InitialState.message;
    }

    switch (action.type) {
        case ActionType.AddMessage: {
            // Clone existing messages.
            const messages: IGenericMessage[] = [...state.messages];

            // Append the new message.
            messages.push(action.payload);

            return {
                ...state,
                messages
            };
        }

        case ActionType.MarkMessageSent: {
            // Clone existing messages. Force cast for type support.
            const messages: Array<Writeable<IMessage>> = [...state.messages] as Array<Writeable<IMessage>>;

            let messageFound: boolean = false;

            for (let message of messages) {
                // Only text messages may be marked as sent.
                if (message.type !== MessageType.Text) {
                    continue;
                }

                if (message.id === action.payload && !message.sent) {
                    // Mark the message as sent.
                    message.sent = true;

                    // Activate the found flag.
                    messageFound = true;

                    break;
                }
            }

            // The message does not exist.
            if (!messageFound) {
                throw new Error(`Message with ID '${action.payload}' was not found`);
            }

            return {
                ...state,
                messages
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
