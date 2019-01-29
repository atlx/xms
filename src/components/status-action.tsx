import React from "react";
import "../styles/status-action.scss";

interface ILocalProps {
    readonly tooltip?: string;
}

export default class StatusAction extends React.Component<ILocalProps> {
    public render(): JSX.Element {
        return (
            <div title={this.props.tooltip} className="status-action">
                {this.props.children}
            </div>
        );
    }
}
