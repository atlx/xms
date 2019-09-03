import React from "react";
import "../styles/misc/slimButton.scss";
import {Callback} from "../core/app";

type Props = {
	readonly text: string;

	readonly main?: boolean;

	readonly onClick?: Callback;
};

export default class SlimButton extends React.Component<Props> {
	protected handleClick(): void {
		if (this.props.onClick) {
			this.props.onClick();
		}
	}

	public close(): void {
		// TODO
	}

	public render(): JSX.Element {
		return (
			<div onClick={() => this.handleClick()} data-main={this.props.main} className="slim-button">
				{this.props.text}
			</div>
		);
	}
}
