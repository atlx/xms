import React, {Component} from "react";
import "@/styles/sidebar/sidebarItem.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Tooltip, {TooltipPosition} from "../tooltip";

interface IProps {
    readonly icon: IconProp;

    readonly name: string;

    readonly active?: boolean;
}

export default class SidebarItem extends Component<IProps> {
    public render(): JSX.Element {
        return (
            <div data-active={this.props.active} className="sidebar-item">
                <Tooltip text={this.props.name} position={TooltipPosition.Right}>
                    <div className="item-wrap">
                        <div className="active-indicator"></div>
                        <FontAwesomeIcon icon={this.props.icon} />
                    </div>
                </Tooltip >
            </div >
        );
    }
}
