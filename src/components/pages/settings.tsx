import React, {Component} from "react";
import Page from "./page";
import "../../styles/pages/settings.scss";

export default class SettingsPage extends Component {
    public render(): JSX.Element {
        return (
            <Page className="settings-page" closeTooltip="Close">
                <div className="sidebar">
                    <div className="item active">General</div>
                    <div className="item">Network</div>
                    <div className="item">Contacts</div>
                    <div className="item">Plugins</div>
                    <div className="item">Keybindings</div>
                    <div className="item">Activity</div>
                    <div className="item">Language</div>
                    <div className="item">Account</div>
                    <div className="item">Developer</div>
                </div>
                <div className="content">

                </div>
            </Page>
        );
    }
}
