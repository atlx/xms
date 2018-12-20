import {Reducer, ActionType, initialState} from "../store";
import {IRoosterCategory} from "../../types/types";

const categoryReducer: Reducer = (state, action) => {
    if (!state) {
        return initialState;
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

    return state;
}

export default categoryReducer;