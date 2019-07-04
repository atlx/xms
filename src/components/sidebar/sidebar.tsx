import React, {Component} from "react";
import "../../styles/sidebar/sidebar.scss";
import SidebarItem from "./sidebarItem";
import {faInbox, faBell, faCompass, faCog, faBug} from "@fortawesome/free-solid-svg-icons";

export default class Sidebar extends Component {
    public render(): JSX.Element {
        return (
            <div className="sidebar">
                <div>
                    <SidebarItem active={true} icon={faInbox} />
                    <SidebarItem icon={faCompass} />
                    <SidebarItem icon={faBell} />
                </div>
                <div>
                    <SidebarItem icon={faBug} />
                    <SidebarItem icon={faCog} />
                </div>
            </div>
        );
    }
}
