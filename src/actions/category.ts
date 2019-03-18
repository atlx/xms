import {IRosterCategory, UniqueId, SpecialCategory} from "../models/misc";
import {store, ActionType} from "../store/store";

export default abstract class CategoryActions {
    public static add(category: IRosterCategory): void {
        store.dispatch({
            type: ActionType.AddCategory,
            payload: category
        });
    }

    public static addUser(userId: UniqueId, category: string | SpecialCategory): void {
        store.dispatch({
            type: ActionType.AddUserToCategory,

            payload: {
                userId,
                category
            }
        });
    }
}
