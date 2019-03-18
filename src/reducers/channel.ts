import {Reducer, ActionType} from "../store";
import {IChannel} from "../../models/channel";

const channelReducer: Reducer = (state, action) => {
    // Return default initial state for this reducer.
    if (!state) {
        return null;
    }

    switch (action.type) {
        case ActionType.SetActiveChannel: {
            if (!action.payload || typeof (action.payload) !== "string") {
                throw new Error("Invalid payload");
            }
            else if (!state.channels.has(action.payload)) {
                throw new Error("Attempting to set a channel that does not exist within the application state");
            }

            return {
                ...state,
                activeChannel: state.channels.get(action.payload) as IChannel
            };
        }

        case ActionType.SetGeneralAsActiveChannel: {
            return {
                ...state,
                activeChannel: state.channels.get("general") as IChannel
            };
        }

        case ActionType.AddChannel: {
            return {
                ...state,
                channels: state.channels.set(action.payload.id, action.payload)
            };
        }

        case ActionType.RemoveChannel: {
            return {
                ...state,
                channels: state.channels.delete(action.payload)
            };
        }

        // TODO: In the future merge next 3 actions into one "ChangeChannelProperty"
        case ActionType.RenameChannel: {
            const channel: IChannel = state.channels.get(action.payload.channelId) as IChannel;

            const newChannel: IChannel = {
                ...channel,
                name: action.payload.name
            };

            return {
                ...state,
                channels: state.channels.set(channel.id, newChannel)
            };
        }

        case ActionType.SetChannelNotify: {
            const channel: IChannel = state.channels.get(action.payload.channelId) as IChannel;

            const newChannel: IChannel = {
                ...channel,
                notify: action.payload
            };

            return {
                ...state,
                channels: state.channels.set(channel.id, newChannel)
            };
        }

        case ActionType.SetChannelTopic: {
            const channel: IChannel = state.channels.get(action.payload.channelId) as IChannel;

            const newChannel: IChannel = {
                ...channel,
                topic: action.payload.topic
            };

            return {
                ...state,
                channels: state.channels.set(channel.id, newChannel)
            };
        }
    }

    return state;
}

export default channelReducer;
