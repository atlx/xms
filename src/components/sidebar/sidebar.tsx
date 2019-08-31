import React, {Component} from "react";
import "../../styles/sidebar/sidebar.scss";
import SidebarItem from "./sidebarItem";
import {faInbox, faBell, faCompass, faCog, faBug, faChartPie} from "@fortawesome/free-solid-svg-icons";

export default class Sidebar extends Component {
    public render(): JSX.Element {
        return (
            <div className="sidebar">
                <div>
                    <SidebarItem name="Chat" active={true} icon={faInbox} />
                    <SidebarItem name="Explore" icon={faCompass} />
                    <SidebarItem name="Toggle notifications" icon={faBell} />
                    <SidebarItem name="Stats" icon={faChartPie} />
                </div>
                <div>
                    <SidebarItem name="Developer toolbox" icon={faBug} />
                    <SidebarItem name="Settings" icon={faCog} />
                </div>
            </div>
        );
    }
}
