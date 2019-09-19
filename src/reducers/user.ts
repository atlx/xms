import {Reducer, ActionType, IAppStateUser} from "../store/store";
import {User} from "@/models/user";
import App from "@/core/app";

const userReducer: Reducer<IAppStateUser> = (state, action) => {
    // Return default initial state for this reducer.
    if (!state) {
        return App.initialState.user;
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
            const user: User = action.payload;

            return {
                ...state,
                users: state.users.set(user.id, user)
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
