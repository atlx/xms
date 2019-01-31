import {Reducer, ActionType, InitialState, IAppStateCategory} from "../store";
import {IRosterCategory} from "../../types/types";

const categoryReducer: Reducer<IAppStateCategory> = (state, action) => {
    // Return default initial state for this reducer.
    if (!state) {
        return InitialState.category;
    }

    switch (action.type) {
        case ActionType.AddCategory: {
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        }

        case ActionType.AddUserToCategory: {
            const categories: IRosterCategory[] = [...state.categories];
            const index: number = categories.findIndex((category: IRosterCategory) => category.id === action.payload.category);

            categories[index].users.push(action.payload.userId);

            return {
                ...state,
                categories
            };
        }

        case ActionType.RenameCategory: {
            // TODO: Can't do this until changing categories from array to map

            throw new Error("Not yet implemented");
        }
    }

    return state as any;
}

export default categoryReducer;
