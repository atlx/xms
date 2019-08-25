import {Reducer, ActionType, IAppStateNet} from "../store/store";
import App from "../core/app";

const netReducer: Reducer<IAppStateNet> = (state, action) => {
    // Return default initial state for this reducer.
    if (!state) {
        return App.initialState.net;
    }

    switch (action.type) {
        case ActionType.AddPing: {
            // TODO: Should be a ping array instead of last ping only.

            return {
                ...state,
                lastPing: action.payload
            };
        }

        case ActionType.SetConnectionState: {
            return {
                ...state,
                connectionState: action.payload
            };
        }

        case ActionType.SetGroupAddress: {
            return {
                ...state,
                groupAddress: action.payload
            };
        }
    }

    return state;
}

export default netReducer;
