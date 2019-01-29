import React from "react";
import "../styles/status-item.scss";
import StatusItem from "./status-item";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faDotCircle, faCircle} from "@fortawesome/free-regular-svg-icons";

interface ILocalProps {
    /**
     * Whether this item is selected. Defaults to false.
     */
    readonly selected?: boolean;
}

export default class StatusSelectItem extends React.Component<ILocalProps> {
    public getIcon(): IconProp {
        if (this.props.selected) {
            return faDotCircle;
        }

        return faCircle;
    }

    public render(): JSX.Element {
        return (
            <StatusItem icon={this.getIcon()}>{this.props.children}</StatusItem>
        );
    }
}
