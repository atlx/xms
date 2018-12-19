import {Reducer, ActionType} from "../store";

const contextMenuReducer: Reducer = (state, action) => {
    if (!state) {
        return state;
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