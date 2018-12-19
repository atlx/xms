import {Reducer, ActionType} from "../store";
import {IChannel} from "../../types/types";

const channelReducer: Reducer = (state, action) => {
    if (!state) {
        return state;
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
    }

    return state;
}

export default channelReducer;