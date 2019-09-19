import {User} from "@/models/user";
import App from "@/core/app";
import {EventEmitter} from "events";

export default class PluginBasic extends EventEmitter {
    public getUser(): User | undefined {
        return Object.assign({}, App.store.state.user.me);
    }
}
