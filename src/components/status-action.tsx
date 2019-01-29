import React from "react";
import "../styles/status-action.scss";
import {Callback} from "../core/app";

export interface IStatusActionProps {
    readonly tooltip?: string;
    readonly onClick?: Callback;
}

export default class StatusAction extends React.Component<IStatusActionProps> {
    public computeClassNames(): string {
        const classes: string[] = ["status-action"];

        if (this.props.onClick !== undefined) {
            classes.push("clickable");
        }

        return classes.join(" ");
    }

    public render(): JSX.Element {
        return (
            <div onClick={this.props.onClick} title={this.props.tooltip} className={this.computeClassNames()}>
                {this.props.children}
            </div>
        );
    }
}
