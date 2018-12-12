import React from "react";
import "../styles/pages/default.scss";
import Explorer from "../components/explorer";
import Chat from "../components/chat";
import Rooster from "../components/rooster";
import Modal from "../components/modal";

export default class DefaultPage extends React.Component {
	public render(): JSX.Element {
		return (
			<React.Fragment>
				<Modal text="Hello world" title="Some title here" />
				<Explorer />
				{/* TODO: Props are hard-coded */}
				<Chat
					commandHandler={null as any}
					autoCompleteVisible={false}
					offsetMultiplier={10}
					messages={[]}
					inputLocked={true}
					activeChannel={null as any}
				/>
				<Rooster />
			</React.Fragment>
		);
	}
}
