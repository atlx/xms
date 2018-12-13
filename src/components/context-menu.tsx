import React from "react";
import "../styles/context-menu.scss";

type ContextMenuProps = {
    readonly title: string;
}

export default class ContextMenu extends React.Component<ContextMenuProps> {
	public render(): JSX.Element {
		return (
			<div className="context-menu">
                <div className="title">{this.props.title}</div>
                <div className="options">
                    <div className="option">Hello world</div>
                </div>
			</div>
		);
	}
}
