import React from "react";
import "../styles/pages/default.scss";
import Explorer from "../components/explorer";
import Chat from "../components/chat";
import Rooster from "../components/rooster";

export default class DefaultPage extends React.Component {
	public render(): JSX.Element {
		return (
			<React.Fragment>
				<Explorer />
				{/* TODO: Props */}
				<Chat offsetMultiplier={10} messages={[]} inputLocked={true} activeChannel={null as any} />
				<Rooster />
			</React.Fragment>
		);
	}
}
