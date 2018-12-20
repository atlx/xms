import {Reducer, ActionType} from "../store";

const miscReducer: Reducer = (state, action) => {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case ActionType.SetInputLocked: {
            return {
                ...state,
                inputLocked: action.payload
            };
        }

        case ActionType.SetPage: {
            // TODO: Verify page type is valid
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