import React from "react";
import "../styles/user-bar-action.scss";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "./tooltip";

interface ILocalProps {
    readonly icon: IconProp;
    readonly tooltip: string;
}

export default class UserBarAction extends React.Component<ILocalProps> {
    public render(): JSX.Element {
        return (
            <Tooltip text={this.props.tooltip}>
                <div className="user-bar-action">
                    <FontAwesomeIcon icon={this.props.icon} />
                </div>
            </Tooltip>
        );
    }
}
