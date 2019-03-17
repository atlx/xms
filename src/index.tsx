import App from "./core/app";
import "./styles/lib/global.scss";
import {User, Page} from "./models/models";
import Config, {IConfig} from "./core/config";
import {Provider} from "react-redux";
import React from "react";
import {store} from "./store/store";
import {HashRouter, Switch, Route} from "react-router-dom";
import ErrorPage from "./components/pages/error";
import AuthPage from "./components/pages/auth";
import HandleBar from "./components/handle";
import Application from "./components/application";

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

export const MainApp: App = new App(me, () => (
    <Provider store={store}>
        <HandleBar />
        <HashRouter>
            <Switch>
                {/* TODO: Hard-coded prop as null (required to pass in). */}
                <Route path="/" exact render={() =>
                    <Application modals={[] as any} page={Page.Init} />
                } />
                <Route path="/" exact component={AuthPage} />
                <Route component={ErrorPage} />
            </Switch>
        </HashRouter>
    </Provider>
));

MainApp.init();
