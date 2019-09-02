import React from "react";
import Chat from "../chat/chat";
import ContactsBar from "../contactsBar/contactsBar";
import {connect} from "react-redux";
import {IAppState, ConnectionState} from "../../store/store";
import Sidebar from "../sidebar/sidebar";
import StatusBar from "../status/statusBar";
import Page from "./page";
import "../../styles/pages/default.scss";

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
			<Page pageId={PageId.Default}>
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
			</Page>
		);
	}
}

export default connect((state: IAppState): any => {
	return {
		leftPanelVisible: state.misc.leftPanelVisible
	};
})(DefaultPage);
