import App from "./app";
import Actions from "../store/actions";
import {UserState, SpecialCategory} from "../types/types";

export default class DeveloperToolbox {
    protected app: App;

    public constructor(app: App) {
        this.app = app;
    }

    public emulatePublicMessage(): this {
        // TODO

        return this;
    }

    public addDummyUser(): this {
        const id: string = "u" + Date.now().toString();

        Actions.addUser({
            createdTime: Date.now(),
            username: "Dummy",
            id,
            state: UserState.Online
        });

        Actions.addUserToCategory(id, SpecialCategory.Connected);

        return this;
    }
}
