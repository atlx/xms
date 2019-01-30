import React from "react";
import "../styles/handle.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {remote} from "electron";
import {DevelopmentMode} from "../core/app";

export default class Handle extends React.Component {
	public constructor(props: any) {
		super(props);

		// Bindings
		this.closeApp = this.closeApp.bind(this);
	}

	public closeApp(): void {
		remote.getCurrentWindow().close();
	}

	public render(): JSX.Element {
		return (
			<div className="handle">
				<div className="title">XMS by Atlas</div>
				<div className="buttons">
					{DevelopmentMode &&
						<div className="dev-mode">Dev. Mode</div>
					}
					<div onClick={this.closeApp} className="button-wrapper">
						<FontAwesomeIcon icon={faTimes} className="button" />
					</div>
				</div>
			</div>
		);
	}
}
