import React from "react";
import "../../styles/explorer/explorer.scss";
import ExplorerItem from "./explorerItem";
import {IAppState} from "../../store/store";
import {connect} from "react-redux";
import {UniqueId} from "../../models/misc";
import {Map as ImmutableMap} from "immutable";
import PlaceholderExplorerItem from "../placeholder/explorerItem";
import UserBar from "../userBar/userBar";
import ExplorerBreak from "./explorerBreak";
import {IChannel, SpecialChannel, ChannelType} from "../../models/channel";
import {BasicMap} from "../../core/helpers";

interface IProps {
	readonly channels: BasicMap<IChannel>;
	readonly activeChannelId: UniqueId | null;
}

class Explorer extends React.Component<IProps> {
	public constructor(props: IProps) {
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
					notify={false}

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
				<div className="items">
					<ExplorerItem notify active={this.props.activeChannelId === SpecialChannel.General} name="General" type={ChannelType.Public} />
					<ExplorerBreak />
					{this.renderItems()}
					<PlaceholderExplorerItem opacity={1} />
					<PlaceholderExplorerItem opacity={2} />
					<PlaceholderExplorerItem opacity={3} />
					<PlaceholderExplorerItem opacity={4} />
				</div>
				<UserBar />
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState): IProps => {
	return {
		channels: state.category.channels,
		activeChannelId: state.category.activeChannel !== null ? state.category.activeChannel.id : null
	};
};

export default connect(mapStateToProps)(Explorer);
