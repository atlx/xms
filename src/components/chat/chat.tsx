import React from "react";
import "../../styles/chat/chat.scss";
import {connect} from "react-redux";
import {IAppState} from "../../store/store";
import CommandHandler from "../../core/commandHandler";
import {Map as ImmutableMap} from "immutable";
import {UniqueId} from "../../models/misc";
import {User} from "../../models/user";
import ChatHeader from "./chatHeader";
import ChatContainer from "./chatContainer";
import {IChannel} from "../../models/channel";
import ChatComposer from "./chatComposer";

interface IProps {
	readonly activeChannel: IChannel;
	readonly inputLocked: boolean;
	readonly commandHandler: CommandHandler;
	readonly users: ImmutableMap<UniqueId, User>;
}

interface IState {
	readonly value: string;
}

class Chat extends React.Component<IProps, IState> {
	private static readonly inputMaxLength: number = 100;

	public componentWillMount(): void {
		// TODO: Needs to reset once the component unmounts, use componentWillUnmount or componentDidUnmount for that.
		// Scroll messages when the escape key is pressed.
		window.onkeydown = (e: any) => {
			if (e.key === "Escape"
				&& (document.activeElement === document.body
					|| document.activeElement === this.$input.current)) {
				this.scrollMessages();
				this.focus();
			}
		};
	}

	protected handleInputChange(value: string): void {
		if (!this.inCommand()) {
			this.setAutoCompleteVisible(false);
		}
		else if (this.inCommand() && this.props.autoCompleteVisible) {
			this.filterAutoCompleteItems();
		}
		else if (this.inCommand()) {
			this.filterAutoCompleteItems();
			this.setAutoCompleteVisible(true);
		}

		// Create length variables for conviniency.
		const valueLength: number = value.length;
		const maxLength: number = Chat.inputMaxLength;
		const threshold: number = Math.round(maxLength / 5);

		// Update character counter if threshold is met, and is not at max length.
		if (valueLength > threshold && valueLength <= maxLength) {
			this.setState({
				status: `${maxLength - valueLength} characters left`
			});
		}
		// Length does not exceed threshold, hide counter.
		else {
			this.setState({
				status: undefined
			});
		}
	}

	public render(): JSX.Element {
		return (
			<div className="chat">
				<ChatHeader />
				<ChatContainer messages={undefined as any} offsetMultiplier={1} />

				{/* TODO: Hard-coded empty values, replaced by redux. */}
				<ChatComposer locked={this.props.inputLocked} maxLength={Chat.inputMaxLength} autoCompleteVisible={undefined as any} />

				{/* TODO: Moved from 'chatComposer.tsx' but have not changed CSS classes. */}
				<div className="extra">
                    <div className="typing"></div>
                    <div className="status">{this.state.status}</div>
                </div>
			</div>
		);
	}
}
export default connect((state: IAppState): any => {
	return {
		activeChannel: state.category.activeChannel,
		inputLocked: state.misc.inputLocked,
		commandHandler: state.category.commandHandler,
		users: state.user.users
	};
})(Chat);
