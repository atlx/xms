import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../styles/explorer-item.scss";
import {faQuestionCircle, IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";
import {ChannelType} from "../types/types";

type ExplorerItemProps = {
    readonly name: string;
    readonly type: ChannelType;
    readonly indicate: boolean;
    readonly active: boolean;
}

export default class ExplorerItem extends React.Component<ExplorerItemProps> {
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
