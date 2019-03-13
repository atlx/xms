import React from "react";
import "../styles/pages/default.scss";
import Explorer from "../components/explorer";
import Chat from "../components/chat";
import Roster from "../components/roster";
import StatusBar from "../components/status-bar";
import {connect} from "react-redux";
import {IAppState} from "../store/store";

interface ILocalProps {
	readonly leftPanelVisible?: boolean;
}

interface ILocalState {
	readonly showTestModal: boolean;
}

class DefaultPage extends React.Component<ILocalProps, ILocalState> {
	public componentWillMount(): void {
		this.setState({
			showTestModal: true
		});
	}

	public render(): JSX.Element {
		return (
			<React.Fragment>
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
				/>
				<Roster categories={null as any} users={null as any} />
				<StatusBar {...undefined as any} />
			</React.Fragment>
		);
	}
}

export default connect((state: IAppState): any => {
	return {
		leftPanelVisible: state.misc.leftPanelVisible
	};
})(DefaultPage);
