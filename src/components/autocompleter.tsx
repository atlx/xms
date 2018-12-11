import React, {CSSProperties} from "react";
import "../styles/auto-completer.scss";
import {IAutoCompleteItem} from "../types/types";

type AutocompleterProps = {
	readonly visible: boolean;
	readonly items: IAutoCompleteItem[];
}

export default class Autocompleter extends React.Component<AutocompleterProps> {
	public getStyle(): CSSProperties | undefined {
		if (this.props.visible) {
			return {
				display: "initial"
			};
		}
	}

	public renderItems(): JSX.Element[] {
		return this.props.items.map((item: IAutoCompleteItem, index: number) => {
			return <div key={item.id} tabIndex={index + 1} className="option">
				<div className="name">{item.name}</div>
				{item.subtext !== undefined &&
					<div className="subtext">{item.subtext}</div>
				}
			</div>;
		});
	}

	public render(): JSX.Element | null {
		if (this.props.items.length === 0) {
			return null;
		}

		return (
			<div style={this.getStyle()} className="auto-completer">
				<div className="title">Autocompleter Title</div>
				{this.renderItems()}
			</div>
		);
	}
}
