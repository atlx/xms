import App from "./core/app";
import "./styles/global.scss";
import {User, UserState} from "./types/types";
import os from "os";
import Utils from "./core/utils";

const me: User = {
    avatarUrl: "",
    categoryId: "",
    
    // TODO: Use cached/saved or generate then save
    id: Utils.generateId(),
    state: UserState.Online,
    createdTime: 0,
    status: undefined,
    username: os.userInfo().username
};

export const app: App = new App(me);

app.init();
