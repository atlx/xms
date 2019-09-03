import React, {CSSProperties} from "react";
import "../styles/misc/application.scss";
import {IAppState} from "../store/store";
import {connect} from "react-redux";
import {IModal} from "../models/misc";
import {CSSTransition} from "react-transition-group";
import Modal from "./modal";
import ModalActions from "../actions/modal";
import PageId from "../core/pageId";

type Props = {
	readonly modals: IModal[];

	readonly leftPanelVisible?: boolean;
};

class Application extends React.Component<Props> {
	public getAppContentStyle(): CSSProperties {
		const properties: CSSProperties = {};

		if (this.props.page !== PageId.Default) {
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
		ModalActions.shift();

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
				{/* <Dialog options={[
					<SlimButton main key="first" text="Test" />
				]} title="Are you sure you want to continue?" text="This is a dialog box with a message and options." /> */}
				{this.renderNextModal()}
				{/* TODO: Not applying rule to EXITING component, just entering one. */}
				<CSSTransition classNames="page" timeout={600}>
					<div style={this.getAppContentStyle()} className="content">
						{this.props.children}
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
