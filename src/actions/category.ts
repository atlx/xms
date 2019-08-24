import {IRosterCategory, UniqueId, SpecialCategory} from "../models/misc";
import {ActionType} from "../store/store";
import App from "../core/app";

export default abstract class CategoryActions {
    public static add(category: IRosterCategory): void {
        App.store.dispatch({
            type: ActionType.AddCategory,
            payload: category
        });
    }

    public static addUser(userId: UniqueId, category: string | SpecialCategory): void {
        App.store.dispatch({
            type: ActionType.AddUserToCategory,

            payload: {
                userId,
                category
            }
        });
    }
}
