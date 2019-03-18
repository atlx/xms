import {Reducer, ActionType} from "../store/store";

const commandReducer: Reducer = (state, action) => {
    // Return default initial state for this reducer.
    if (!state) {
        return null;
    }

    switch (action.type) {
        case ActionType.RegisterCommand: {
            return {
                ...state,
                commandHandler: state.commandHandler.register(action.payload)
            };
        }
    }

    return state;
}

export default commandReducer;
