import App from "./core/app";
import "./styles/global.scss";
import {User, UserState} from "./types/types";
import os from "os";
import Utils from "./core/utils";

const me: User = {
    // TODO: Use cached/saved or generate then save
    id: Utils.generateId(),
    state: UserState.Online,
    createdTime: Date.now(),
    username: os.userInfo().username
};

export const MainApp: App = new App(me);

MainApp.init();
