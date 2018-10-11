import React from "react";
import "../styles/rooster-item.scss";

type RoosterItemProps = {
    readonly name: string;
    readonly avatarUrl: string;
    readonly status?: string;
}

export default class RoosterItem extends React.Component<RoosterItemProps> {
    public getComponentStyle(): string {
        const classes: string[] = ["rooster-item"];

        // TODO: Check here if item is local user (import store, etc)
        if (true) {
            classes.push("me");
        }

        return classes.join(" ");
    }

	public render(): JSX.Element {
		return (
			<div className={this.getComponentStyle()}>
                <img className="avatar" src={this.props.avatarUrl} />
                <div className="info-wrapper">
                    <div className="name">{this.props.name}</div>
                    <div className="status">{this.props.status}</div>
                </div>
			</div>
		);
	}
}
