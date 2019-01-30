import React from "react";
import "../styles/status-bar/status-item.scss";
import StatusItem from "./status-item";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faDotCircle, faCircle} from "@fortawesome/free-regular-svg-icons";

interface ILocalProps {
    /**
     * Whether this item is selected. Defaults to false.
     */
    readonly selected?: boolean;

    /**
     * Whether this item is disabled. Defaults to false.
     */
    readonly disabled?: boolean;
}

export default class StatusSelectItem extends React.Component<ILocalProps> {
    public static defaultProps: ILocalProps = {
        disabled: false,
        selected: false
    };

    public getIcon(): IconProp {
        if (this.props.selected) {
            return faDotCircle;
        }

        return faCircle;
    }

    public getClass(): string | undefined {
        if (this.props.disabled) {
            return "disabled";
        }
    }

    public render(): JSX.Element {
        return (
            <StatusItem className={this.getClass()} icon={this.getIcon()}>{this.props.children}</StatusItem>
        );
    }
}
