import {Reducer, ActionType, IAppStateUser, InitialState} from "../store";

const userReducer: Reducer<IAppStateUser> = (state, action) => {
    // Return default initial state for this reducer.
    if (!state) {
        return InitialState.user;
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

        case ActionType.UpdateUser: {
            // TODO
            throw new Error("Not yet implemented");
        }
    }

    return state;
}

export default userReducer;
