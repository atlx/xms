import {Reducer, ActionType} from "../store/store";

const contextMenuReducer: Reducer = (state, action) => {
    // Return default initial state for this reducer.
    if (!state) {
        return null;
    }

    switch (action.type) {
        case ActionType.ShowContextMenu: {
            return {
                ...state,
                contextMenu: action.payload
            };
        }

        case ActionType.HideContextMenu: {
            return {
                ...state,
                contextMenu: null
            };
        }
    }

    return state;
}

export default contextMenuReducer;
