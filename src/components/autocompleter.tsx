import React from "react";
import "../styles/auto-completer.scss";

export default class Autocompleter extends React.Component {
	public render(): JSX.Element {
		return (
			<div className="auto-completer">
				<div className="title">Autocompleter Title</div>
                <div className="option" tabIndex={1}>
					<div className="text">Option 1</div>
					<div className="subtext">Option 1 subtext</div>
				</div>
                <div className="option" tabIndex={2}>
					<div className="text">Option 2</div>
					<div className="subtext">Option 2 subtext</div>
				</div>
				<div className="option" tabIndex={3}>
					<div className="text">Option 3</div>
					<div className="subtext">Option 3 subtext</div>
				</div>
			</div>
		);
	}
}
