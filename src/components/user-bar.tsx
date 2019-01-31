import React from "react";
import "../styles/user-bar/user-bar.scss";
import UserBarAction from "./user-bar-action";
import {faCog, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {MainApp} from "..";
import Actions from "../store/actions";

export default class UserBar extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="user-bar">
                <div className="avatar"></div>
                <div className="info">
                    <div className="name">{MainApp.me.username}</div>
                    <div className="status"></div>
                </div>
                <div className="actions">
                    <UserBarAction onClick={() => Actions.setLeftPanelVisible(false)} tooltip="Hide" icon={faArrowLeft} />
                    <UserBarAction tooltip="Settings" icon={faCog} />
                </div>
            </div>
        );
    }
}
