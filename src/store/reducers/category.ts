import {Reducer, ActionType, InitialState} from "../store";
import {IRoosterCategory} from "../../types/types";

const categoryReducer: Reducer = (state, action) => {
    // Return default initial state.
    if (!state) {
        return InitialState;
    }

    switch (action.type) {
        case ActionType.AddCategory: {
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        }

        case ActionType.AddUserToCategory: {
            const categories: IRoosterCategory[] = [...state.categories];
            const index: number = categories.findIndex((category: IRoosterCategory) => category.id === action.payload.category);

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
