import React from "react";
import "../styles/user-bar/user-bar-action.scss";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "../tooltip";
import {Callback} from "../../core/app";

interface ILocalProps {
    readonly icon: IconProp;
    readonly tooltip: string;
    readonly onClick?: Callback;
}

export default class UserBarAction extends React.Component<ILocalProps> {
    public render(): JSX.Element {
        return (
            <Tooltip text={this.props.tooltip}>
                <div onClick={this.props.onClick} className="user-bar-action">
                    <FontAwesomeIcon icon={this.props.icon} />
                </div>
            </Tooltip>
        );
    }
}
