import App from "./app";
import {SpecialCategory} from "../models/misc";
import {GeneralChannel} from "../store/store";
import Factory from "./factory";
import {UserState} from "../models/user";
import MessageActions from "../actions/message";
import UserActions from "../actions/user";
import CategoryActions from "../actions/category";

export default class DeveloperToolbox {
    protected app: App;

    public constructor(app: App) {
        this.app = app;
    }

    public emulatePublicMessage(): this {
        // TODO

        return this;
    }

    public emulateBreakMessage(): this {
        MessageActions.addToGeneral(Factory.createBreakMessage(GeneralChannel.id, "Requested by user"));

        return this;
    }

    public addDummyUser(): this {
        const id: string = "u" + Date.now().toString();

        UserActions.add({
            createdTime: Date.now(),
            username: "Dummy",
            id,
            state: UserState.Online
        });

        CategoryActions.addUser(id, SpecialCategory.Connected);

        return this;
    }
}
