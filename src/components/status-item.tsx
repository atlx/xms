import React, {CSSProperties} from "react";
import "../styles/status-item.scss";
import {Callback} from "../core/app";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Tooltip from "./tooltip";

export interface IStatusItemProps {
    readonly tooltip?: string;
    readonly onClick?: Callback;
    readonly loading?: boolean;
    readonly icon?: IconProp;
    readonly style?: CSSProperties;

    /**
     * The class name(s) that will be appended.
     */
    readonly className?: string;
}

export default class StatusItem extends React.Component<IStatusItemProps> {
    public computeClassNames(): string {
        const classes: string[] = ["status-item"];

        // Append provided class names.
        if (this.props.className !== undefined) {
            classes.push(this.props.className);
        }

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
        const content: JSX.Element = (
            <div style={this.props.style} onClick={this.props.onClick} className={this.computeClassNames()}>
                {this.renderIcon()}
                {this.props.children}
            </div>
        );

        if (this.props.tooltip !== undefined) {
            return (
                <Tooltip text={this.props.tooltip}>
                    {content}
                </Tooltip>
            );
        }

        return content;
    }
}
