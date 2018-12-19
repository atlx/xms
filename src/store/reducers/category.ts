import {Reducer, ActionType} from "../store";
import {IRoosterCategory} from "../../types/types";

const categoryReducer: Reducer = (state, action) => {
    if (!state) {
        return state;
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
    }

    return state;
}

export default categoryReducer;