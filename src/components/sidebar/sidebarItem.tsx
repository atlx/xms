import React, {Component} from "react";
import "../../styles/sidebar/sidebarItem.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface IProps {
    readonly icon: IconProp;

    readonly active?: boolean;
}

export default class SidebarItem extends Component<IProps> {
    public getClasses(): string {
        const classes = ["sidebar-item"];

        if (this.props.active) {
            classes.push("active");
        }

        return classes.join(" ");
    }

    public render(): JSX.Element {
        return (
            <div className={this.getClasses()}>
                <div className="item-wrap">
                    <div className="active-indicator"></div>
                    <FontAwesomeIcon icon={this.props.icon} />
                </div>
            </div>
        );
    }
}
