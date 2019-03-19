import React from "react";
import "../../styles/pages/default.scss";
import Explorer from "../explorer/explorer";
import Chat from "../chat/chat";
import Roster from "../roster/roster";
import StatusBar from "../status/statusBar";
import {connect} from "react-redux";
import {IAppState} from "../../store/store";
import Sidebar from "../sidebar/sidebar";

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
				{this.props.leftPanelVisible &&
					<Explorer />
				}
				{/* TODO: Props are hard-coded */}
				<Chat
					autoCompleteCommands={null as any}
					commandHandler={null as any}
					autoCompleteVisible={false}
					offsetMultiplier={10}
					messages={[]}
					inputLocked={true}
					activeChannel={null as any}
					users={undefined as any}
				/>
				<Roster categories={null as any} users={null as any} />
				<StatusBar {...undefined as any} />
			</div>
		);
	}
}

export default connect((state: IAppState): any => {
	return {
		leftPanelVisible: state.misc.leftPanelVisible
	};
})(DefaultPage);
