import React, { CSSProperties } from "react";
import "../styles/application.scss";
import DefaultPage from "../pages/default";
import {AppState} from "../store/store";
import {connect} from "react-redux";
import {Page} from "../types/types";
import InitPage from "../pages/init";

type ApplicationState = {
	readonly page: Page;
}

class Application extends React.Component<ApplicationState> {
	public renderPage(): JSX.Element {
		switch (this.props.page) {
			case Page.Default: {
				return <DefaultPage />;
			}

			case Page.Init: {
				return <InitPage />;
			}

			default: {
				throw new Error(`Unable to render unknown page: ${this.props.page}`);
			}
		}
	}

	public getApplicationStyle(): CSSProperties | undefined {
		if (this.props.page !== Page.Default) {
			return {
				display: "initial"
			};
		}
	}

	public render(): JSX.Element {
		return (
			<div style={this.getApplicationStyle()} className="application">
				{this.renderPage()}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): any => {
	return {
		page: state.page
	};
};

export default connect(mapStateToProps)(Application);
