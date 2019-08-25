import App from "./core/app";
import "./styles/global.scss";
import {Page} from "./models/misc";
import Config, {IConfig} from "./core/config";
import {Provider} from "react-redux";
import React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";
import ErrorPage from "./components/pages/error";
import AuthPage from "./components/pages/auth";
import Application from "./components/application";
import {User} from "./models/user";
import SettingsPage from "./components/pages/settings";

// Prepare config.
const config: IConfig = Config.loadOrCreate();

// Create the local user object.
const me: User = {
    id: config.id,
    state: config.state,
    createdTime: config.createdTime,
    username: config.username,
    status: config.status
};

App.boot(me, () => (
    <Provider store={App.store.unwrap()}>
        <HashRouter>
            <Switch>
                {/* TODO: Hard-coded prop as null (required to pass in). */}
                <Route path="/" exact render={() =>
                    <Application modals={[] as any} content={<SettingsPage />} />
                } />
                <Route path="/" exact component={AuthPage} />
                <Route component={ErrorPage} />
            </Switch>
        </HashRouter>
    </Provider>
));
