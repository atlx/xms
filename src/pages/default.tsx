import React from "react";
import "../styles/pages/default.scss";
import Explorer from "../components/explorer";
import Chat from "../components/chat";
import Rooster from "../components/rooster";
import Handle from "../components/handle";

export default class DefaultPage extends React.Component {
	public render(): JSX.Element {
		return (
			<React.Fragment>
				<Handle />
				<Explorer />
				<Chat />
				<Rooster />
			</React.Fragment>
		);
	}
}
