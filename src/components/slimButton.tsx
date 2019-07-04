import React from "react";
import "../styles/misc/slimButton.scss";
import {Callback} from "../core/app";

interface IProps {
	readonly text: string;

	readonly main?: boolean;

	readonly onClick?: Callback;
}

export default class SlimButton extends React.Component<IProps> {
	protected getClasses(): string {
		const classes = ["slim-button"];

		if (this.props.main) {
			classes.push("main");
		}

		return classes.join(" ");
	}

	protected handleClick(): void {
		if (this.props.onClick) {
			this.props.onClick();
		}
	}

	public close(): void {
	}

	public render(): JSX.Element {
		return (
			<div onClick={() => this.handleClick()} className={this.getClasses()}>
                {this.props.text}
			</div>
		);
	}
}
