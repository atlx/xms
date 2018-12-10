import React from "react";
import "../styles/explorer.scss";
import ExplorerItem from "./explorer-item";
import {AppState} from "../store/store";
import {connect} from "react-redux";
import {Channel, UniqueId} from "../types/types";

type ExplorerState = {
	readonly channels: Channel[];
	readonly activeChannelId: UniqueId | null;
}

class Explorer extends React.Component<any, ExplorerState> {
	public constructor(props: any) {
		super(props);

		// Bindings
		this.renderItems = this.renderItems.bind(this);
	}

	public renderItems(): JSX.Element[] {
		// TODO: Shouldn't be required
		if (this.state === null) {
			return [];
		}

		return this.state.channels.map((channel: Channel) =>
			<ExplorerItem
				key={channel.id}
				type={channel.type}

				// TODO
				indicate={false}
				active={this.state.activeChannelId === channel.id}
				name={channel.name}
			/>
		);
	}

	public render() {
		return (
			<div className="explorer">
				{this.renderItems()}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): ExplorerState => {
	return {
		channels: state.channels,
		activeChannelId: state.activeChannel !== null ? state.activeChannel.id : null
	};
};

export default connect(mapStateToProps)(Explorer);
