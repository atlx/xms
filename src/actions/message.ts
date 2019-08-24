import {IGenericMessage, MessageType} from "../models/message";
import {GeneralChannel, ActionType} from "../store/store";
import Time from "../core/time";
import Factory from "../core/factory";
import {BasicMap} from "../core/helpers";
import {UniqueId} from "../models/misc";
import App from "../core/app";

export default abstract class MessageActions {
    /**
     * Clear all messages from the state.
     */
    public static clear(): void {
        App.getStore().dispatch({
            type: ActionType.ClearMessages
        });
    }

    /**
     * Append a message to the general channel.
     */
    public static addToGeneral<T extends IGenericMessage>(message: T): void {
        MessageActions.add({
            channelId: GeneralChannel.id,
            ...message
        });
    }

    /**
     * Append a message to its corresponding channel.
     */
    public static add<T extends IGenericMessage>(message: T): void {
        // A separator message indicating time may come before a normal message.
        if (message.type === MessageType.Text) {
            const messages: BasicMap<IGenericMessage> = getState().message.messages;

            // Ensure a message has been previously sent.
            if (messages.size > 0) {
                const lastMessage: IGenericMessage = messages[getState().message.messages.size - 1];

                // Append separator message beforehand if applicable.
                if (Time.isDayOlder(lastMessage.time, message.time)) {
                    this.add(Factory.createBreakMessage(message.channelId, Time.timeAgo(lastMessage.time)));
                }
            }
        }

        App.getStore().dispatch({
            type: ActionType.AddMessage,
            payload: message
        });
    }

    public static markSent(id: UniqueId): void {
        App.getStore().dispatch({
            type: ActionType.MarkMessageSent,
            payload: id
        });
    }

    public static delete(id: UniqueId): void {
        App.getStore().dispatch({
            type: ActionType.DeleteMessage,
            payload: id
        })
    }
}
