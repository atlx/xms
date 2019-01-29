import React from "react";
import "../styles/status-item.scss";
import {Callback} from "../core/app";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface IStatusItemProps {
    readonly tooltip?: string;
    readonly onClick?: Callback;
    readonly loading?: boolean;
    readonly icon?: IconProp;
}

export default class StatusItem extends React.Component<IStatusItemProps> {
    public computeClassNames(): string {
        const classes: string[] = ["status-item"];

        if (this.props.onClick !== undefined) {
            classes.push("clickable");
        }

        return classes.join(" ");
    }

    public renderIcon(): JSX.Element | undefined {
        if (this.props.loading) {
            return <FontAwesomeIcon className="loading" icon={faCircleNotch} />
        }
        else if (this.props.icon !== undefined) {
            return <FontAwesomeIcon icon={this.props.icon} />;
        }
    }

    public render(): JSX.Element {
        return (
            <div onClick={this.props.onClick} title={this.props.tooltip} className={this.computeClassNames()}>
                {this.renderIcon()}
                {this.props.children}
            </div>
        );
    }
}
