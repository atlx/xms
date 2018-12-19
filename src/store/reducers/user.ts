import {Reducer, ActionType} from "../store";

const userReducer: Reducer = (state, action) => {
    if (!state) {
        return state;
    }

    switch (action.type) {
        case ActionType.UpdateMe: {
            return {
                ...state,

                me: {
                    ...action.payload
                }
            };
        }

        case ActionType.AddUser: {
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        }
    }

    return state;
}

export default userReducer;