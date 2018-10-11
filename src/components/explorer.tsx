import React from "react";
import "../styles/explorer.scss";

export default class Explorer extends React.Component {
	public render() {
		return (
			<div className="explorer">
                {this.props.children}
			</div>
		);
	}
}
