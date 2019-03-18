export default abstract class UserActions {
    public static add(user: User): void {
        store.dispatch({
            type: ActionType.AddUser,
            payload: user
        });
    }

    public static updateMe(me: Partial<User>): void {
        store.dispatch({
            type: ActionType.UpdateMe,
            payload: me
        });
    }
}
