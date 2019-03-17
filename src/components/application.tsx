import React, {CSSProperties} from "react";
import "../styles/misc/application.scss";
import DefaultPage from "./pages/default";
import {IAppState} from "../store/store";
import {connect} from "react-redux";
import {Page, IModal} from "../models/misc";
import InitPage from "./pages/init";
import {CSSTransition} from "react-transition-group";
import Actions from "../store/actions";
import Modal from "./modal";
import Tooltip from "./tooltip";
import Handle from "./handle";

interface ILocalProps {
	readonly page: Page;
	readonly modals: IModal[];
	readonly leftPanelVisible?: boolean;
}

class Application extends React.Component<ILocalProps> {
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

	public getAppContentStyle(): CSSProperties {
		const properties: CSSProperties = {};

		if (this.props.page !== Page.Default) {
			properties.display = "initial";
		}

		// Change grid columns when left panel is not visible.
		if (!this.props.leftPanelVisible) {
			// TODO: Value is hard coded, based from application.scss, which is not good.
			properties.gridTemplateColumns = "minmax(400px, 1fr) 300px";
		}

		return properties;
	}

	public handleModalClose(modal: IModal): void {
		Actions.shiftModal();

		if (modal.onClose) {
			modal.onClose();
		}
	}

	public renderNextModal(): JSX.Element | undefined {
		if (this.props.modals.length > 0) {
			const modal: IModal = this.props.modals[0];

			return (
				<Modal
					key="modal"
					text={modal.text}
					title={modal.title}
					onClose={() => this.handleModalClose(modal)}
				/>
			);
		}

		return undefined;
	}

	public render(): JSX.Element {
		return (
			<div className="application">
				
				{this.renderNextModal()}
				{/* TODO: Not applying rule to EXITING component, just entering one. */}
				<CSSTransition in={this.props.page !== Page.Init} classNames="page" timeout={600}>
					<div style={this.getAppContentStyle()} className="content">
						{this.renderPage()}
					</div>
				</CSSTransition>
			</div>
		);
	}
}

export default connect((state: IAppState): any => {
	return {
		page: state.misc.page,
		modals: state.misc.modals,
		leftPanelVisible: state.misc.leftPanelVisible
	};
})(Application);
