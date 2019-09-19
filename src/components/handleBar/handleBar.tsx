import React from "react";
import HandleButton from "./handleButton";
import App from "@/core/app";
import "@styles/handleBar/handleBar.scss";

export default class Handle extends React.Component {
	public render(): JSX.Element {
		return (
			<div className="handle">
				<div className="title">XMS by Atlas</div>
				<div className="buttons">
					{App.devMode &&
						<div className="dev-mode">Dev. Mode</div>
					}
					<div className="button-wrapper">
						<HandleButton className="button" />
					</div>
				</div>
			</div>
		);
	}
}
