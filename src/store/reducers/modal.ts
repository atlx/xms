import {Reducer, ActionType} from "../store";
import {IModal} from "../../types/types";

const modalReducer: Reducer = (state, action) => {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case ActionType.ShowModal: {
            return {
                ...state,
                modals: [...state.modals, action.payload]
            };
        }

        case ActionType.ShiftModal: {
            const modals: IModal[] = [...state.modals];

            modals.shift();

            return {
                ...state,
                modals
            };
        }
    }

    return state;
}

export default modalReducer;