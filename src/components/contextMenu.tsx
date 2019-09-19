import React, {CSSProperties} from "react";
import "@styles/misc/contextMenu.scss";
import {IContextMenuOption, ContextMenuOptionType, IContextMenu} from "@/models/misc";

export default class ContextMenu extends React.Component<IContextMenu> {
	public renderOptions(): JSX.Element[] {
		return this.props.options.map((option: IContextMenuOption) => {
			// TODO: Add support for more types (such as checkbox)
			switch (option.type) {
				case ContextMenuOptionType.Button: {
					return (
						<div onClick={option.onClick} className="option">
							{option.text}
						</div>
					);
				}

				default: {
					throw new Error(`[ContextMenu] Unknown/invalid option type: ${option.type}`);
				}
			}
		});
	}

	public getStyle(): CSSProperties {
		return {
			top: this.props.position.y + "px",
			left: this.props.position.x + "px"
		};
	}

	public render(): JSX.Element {
		return (
			<div style={this.getStyle()} className="context-menu">
				<div className="title">{this.props.title}</div>
				<div className="options">
					{this.renderOptions()}
				</div>
			</div>
		);
	}
}
