import {Reducer, ActionType} from "../store";

const commandReducer: Reducer = (state, action) => {
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