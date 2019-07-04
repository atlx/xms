import React from "react";
import "../styles/misc/slimButton.scss";

interface IProps {
	readonly text: string;

	readonly main?: boolean;
}

export default class SlimButton extends React.Component<IProps> {
	protected getClasses(): string {
		const classes = ["slim-button"];

		if (this.props.main) {
			classes.push("main");
		}

		return classes.join(" ");
	}

	public render(): JSX.Element {
		return (
			<div className={this.getClasses()}>
                {this.props.text}
			</div>
		);
	}
}
