import React, {CSSProperties} from "react";
import "../styles/application.scss";
import DefaultPage from "../pages/default";
import {AppState} from "../store/store";
import {connect} from "react-redux";
import {Page} from "../types/types";
import InitPage from "../pages/init";
import {CSSTransition} from "react-transition-group";
import Handle from "./handle";

type ApplicationState = {
	readonly page: Page;
}

class Application extends React.Component<ApplicationState> {
	public renderPage(): JSX.Element {
		switch (this.props.page) {
			case Page.Default: {
				return <DefaultPage key={Page.Default} />;
			}

			case Page.Init: {
				return <InitPage key={Page.Init} />;
			}

			default: {
				throw new Error(`Unable to render unknown page: ${this.props.page}`);
			}
		}
	}

	public getAppContentStyle(): CSSProperties | undefined {
		if (this.props.page !== Page.Default) {
			return {
				display: "initial"
			};
		}
	}

	public handleKeyDown(e: any): void {
		// TODO
	}

	public render(): JSX.Element {
		return (
			<div onKeyDown={this.handleKeyDown} className="application">
				<Handle />
				{/* TODO: Not applying rule to EXITING component, just entering one */}
				<CSSTransition in={this.props.page !== Page.Init} classNames="page" timeout={600}>
					<div style={this.getAppContentStyle()} className="content">
						{this.renderPage()}
					</div>
				</CSSTransition>
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
