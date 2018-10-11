import React from "react";
import "../styles/application.scss";
import Explorer from "./explorer";
import Chat from "./chat";
import Rooster from "./rooster";
import Handle from "./handle";
import ExplorerItem, {ExplorerItemType} from "./explorer-item";

export default class Application extends React.Component {
	public render() {
		return (
			<div className="application">
				<Handle />
				<Explorer>
				<ExplorerItem active={true} indicate={true} key={0} name="General" type={ExplorerItemType.TextChannel} />
				<ExplorerItem active={false} indicate={false} key={1} name="Testing" type={ExplorerItemType.TextChannel} />
				<ExplorerItem active={false} indicate={false} key={2} name="Testing 2" type={ExplorerItemType.TextChannel} />
				<ExplorerItem active={false} indicate={true} key={3} name="Memes" type={ExplorerItemType.TextChannel} />
				</Explorer>
				<Chat />
				<Rooster />
			</div>
		);
	}
}
