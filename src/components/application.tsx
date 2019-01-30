import React, {CSSProperties} from "react";
import "../styles/misc/application.scss";
import DefaultPage from "../pages/default";
import {IAppState} from "../store/store";
import {connect} from "react-redux";
import {Page, IModal} from "../types/types";
import InitPage from "../pages/init";
import {CSSTransition} from "react-transition-group";
import Handle from "./handle";
import Actions from "../store/actions";
import Modal from "./modal";

interface ILocalState {
	readonly page: Page;
	readonly modals: IModal[];
}

class Application extends React.Component<ILocalState> {
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

	public handleModalClose(modal: IModal): void {
		Actions.shiftModal();

		if (modal.onClose) {
			modal.onClose();
		}
	}

	public renderNextModal(): JSX.Element | undefined {
		if (this.props.modals.length > 0) {
			const modal: IModal = this.props.modals[0];

			return <Modal
				key="modal"
				text={modal.text}
				title={modal.title}
				onClose={() => this.handleModalClose(modal)}
			/>;
		}

		return undefined;
	}

	public render(): JSX.Element {
		return (
			<div onKeyDown={this.handleKeyDown} className="application">
				<Handle />
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

const mapStateToProps = (state: IAppState): any => {
	return {
		page: state.misc.page,
		modals: state.category.modals
	};
};

export default connect(mapStateToProps)(Application);
