import React from "react";
import "../styles/explorer.scss";
import ExplorerItem from "./explorer-item";
import {IAppState} from "../store/store";
import {connect} from "react-redux";
import {IChannel, UniqueId} from "../types/types";
import {Map as ImmutableMap} from "immutable";

type ExplorerProps = {
	readonly channels: ImmutableMap<UniqueId, IChannel>;
	readonly activeChannelId: UniqueId | null;
}

class Explorer extends React.Component<ExplorerProps> {
	public constructor(props: ExplorerProps) {
		super(props);

		// Bindings
		this.renderItems = this.renderItems.bind(this);
	}

	public renderItems(): JSX.Element[] {
		const items: JSX.Element[] = [];

		for (let [key, value] of this.props.channels) {
			items.push(
				<ExplorerItem
					key={key}
					type={value.type}

					// TODO
					indicate={false}
					active={this.props.activeChannelId === value.id}
					name={value.name}
				/>
			);
		}

		return items;
	}

	public render(): JSX.Element {
		return (
			<div className="explorer">
				{this.renderItems()}
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState): ExplorerProps => {
	return {
		channels: state.category.channels,
		activeChannelId: state.category.activeChannel !== null ? state.category.activeChannel.id : null
	};
};

export default connect(mapStateToProps)(Explorer);
