import React from "react";
import "../styles/application.scss";
import Explorer from "./explorer";
import Chat from "./chat";
import Rooster from "./rooster";
import Handle from "./handle";

export default class Application extends React.Component {
	public render(): JSX.Element {
		return (
			<div className="application">
				<Handle />
				<Explorer />
				<Chat />
				<Rooster />
			</div>
		);
	}
}
