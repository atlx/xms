import React from "react";
import "../styles/pages/default.scss";
import Explorer from "../components/explorer";
import Chat from "../components/chat";
import Roster from "../components/roster";

type DefaultPageState = {
	readonly showTestModal: boolean;
}

export default class DefaultPage extends React.Component<any, DefaultPageState> {
	public componentWillMount(): void {
		this.setState({
			showTestModal: true
		});
	}

	public render(): JSX.Element {
		return (
			<React.Fragment>
				<Explorer />
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
				<Roster />
			</React.Fragment>
		);
	}
}
