import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../styles/explorer/explorer-item.scss";
import {faQuestionCircle, IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";
import {ChannelType} from "../types/types";

interface ILocalProps {
    /**
     * The name that will represent the item.
     */
    readonly name: string;

    /**
     * The type of channel. Affects icon.
     */
    readonly type: ChannelType;

    /**
     * Whether the item emits notification(s). Defaults to false.
     */
    readonly indicate?: boolean;

    /**
     * Whether the item is active or selected. Defaults to false.
     */
    readonly active?: boolean;
}

export default class ExplorerItem extends React.Component<ILocalProps> {
    public getIcon(): IconDefinition {
        if (this.props.type === ChannelType.Public || this.props.type === ChannelType.Private) {
            return faHashtag;
        }

        return faQuestionCircle;
    }

    public getComponentClass(): string {
        const classes: string[] = ["explorer-item"];

        if (this.props.indicate) {
            classes.push("indicate");
        }

        if (this.props.active) {
            classes.push("active");
        }

        return classes.join(" ");
    }

    public render(): JSX.Element {
        return (
            <div className={this.getComponentClass()}>
                <FontAwesomeIcon className="icon" icon={this.getIcon()} />
                <div className="name">{this.props.name}</div>
                <div className="indicator" />
            </div>
        );
    }
}
