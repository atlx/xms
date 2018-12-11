import React from "react";
import "../styles/auto-completer.scss";

export default class Autocompleter extends React.Component {
	public render(): JSX.Element {
		return (
			<div className="auto-completer">
                <div className="option" tabIndex={1}>Option 1</div>
                <div className="option" tabIndex={2}>Option 2</div>
                <div className="option" tabIndex={3}>Option 3</div>
			</div>
		);
	}
}
