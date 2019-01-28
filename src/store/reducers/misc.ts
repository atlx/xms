import {Reducer, ActionType, InitialState, IAppStateMisc} from "../store";

const miscReducer: Reducer<IAppStateMisc> = (state, action) => {
    if (!state) {
        return InitialState.misc;
    }

    switch (action.type) {
        case ActionType.SetInputLocked: {
            return {
                ...state,
                inputLocked: action.payload
            };
        }

        case ActionType.SetPage: {
            // TODO: Verify page type is valid (Should be done in Actions?).
            return {
                ...state,
                page: action.payload
            };
        }

        case ActionType.SetAutoCompleteVisible: {
            return {
                ...state,
                autoCompleteVisible: action.payload
            };
        }
    }

    return state;
}

export default miscReducer;
