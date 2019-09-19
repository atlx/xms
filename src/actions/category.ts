import {IRosterCategory, UniqueId, SpecialCategory} from "@/models/misc";
import {ActionType} from "@/store/store";
import {store} from "@/index";

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
