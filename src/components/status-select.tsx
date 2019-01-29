import React from "react";
import "../styles/status-select.scss";
import StatusItem, {IStatusItemProps} from "./status-item";

interface ILocalProps extends IStatusItemProps {
    readonly text: string;
}

export default class StatusSelect extends React.Component<ILocalProps> {
    public render(): JSX.Element {
        return (
            <div className="status-select">
                <div className="select-body">
                    <div className="body-wrapper">
                        {this.props.children}
                        <div className="arrow" />
                    </div>
                </div>
                <StatusItem {...this.props}>{this.props.text}</StatusItem>
            </div>
        );
    }
}
