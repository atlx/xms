import React from "react";
import "../styles/handle.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {remote} from "electron";

export default class Handle extends React.Component {
	public constructor(props: any) {
		super(props);

		// Bindings
		this.closeApp = this.closeApp.bind(this);
	}

	public closeApp(): void {
		remote.getCurrentWindow().close();
	}

	public render() {
		return (
			<div className="handle">
				<div className="title">XMS by CloudRex</div>
				<div className="buttons">
					<div onClick={this.closeApp} className="button-wrapper">
						<FontAwesomeIcon icon={faTimes} className="button" />
					</div>
				</div>
			</div>
		);
	}
}
