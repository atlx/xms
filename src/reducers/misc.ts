import {Reducer, ActionType, InitialState, IAppStateMisc} from "../store/store";
import {IModal} from "../models/misc";

const miscReducer: Reducer<IAppStateMisc> = (state, action) => {
    // Return default initial state for this reducer.
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

        case ActionType.SetGuideVisible: {
            return {
                ...state,
                guideVisible: action.payload
            };
        }

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

        case ActionType.SetLeftPanelVisible: {
            return {
                ...state,
                leftPanelVisible: action.payload
            };
        }
    }

    return state;
}

export default miscReducer;
