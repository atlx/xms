import React from "react";
import "../../styles/pages/default.scss";
import Chat from "../chat/chat";
import ContactsBar from "../contactsBar/contactsBar";
import {connect} from "react-redux";
import {IAppState, ConnectionState} from "../../store/store";
import Sidebar from "../sidebar/sidebar";
import StatusBar from "../status/statusBar";

interface IProps {
	readonly leftPanelVisible?: boolean;
}

interface IState {
	readonly showTestModal: boolean;
}

class DefaultPage extends React.Component<IProps, IState> {
	public componentWillMount(): void {
		this.setState({
			showTestModal: true
		});
	}

	public render(): JSX.Element {
		return (
			<div className="default-page">
				<Sidebar />

				{/* TODO: Props are hard-coded */}
				<Chat
					inputLocked={true}
					activeChannel={null as any}
					users={undefined as any}
					guideItems={undefined as any}
				/>
				
				<ContactsBar categories={null as any} users={null as any} />
				<StatusBar connectionState={ConnectionState.Connected} ping={0} key="status" />
			</div>
		);
	}
}

export default connect((state: IAppState): any => {
	return {
		leftPanelVisible: state.misc.leftPanelVisible
	};
})(DefaultPage);
