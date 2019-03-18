import React from "react";
import "../../styles/chat/chat.scss";
import {connect} from "react-redux";
import {IAppState} from "../../store/store";
import CommandHandler from "../../core/commandHandler";
import {Map as ImmutableMap} from "immutable";
import {IGuideItem, UniqueId} from "../../models/misc";
import {User} from "../../models/user";
import ChatHeader from "./chatHeader";
import ChatContainer from "./chatContainer";
import {IChannel} from "../../models/channel";
import ChatComposer from "./chatComposer";

interface IProps {
	readonly activeChannel: IChannel;
	readonly inputLocked: boolean;
	readonly commandHandler: CommandHandler;
	readonly autoCompleteCommands: IGuideItem[];
	readonly users: ImmutableMap<UniqueId, User>;
}

interface IState {
	readonly value: string;
}

class Chat extends React.Component<IProps, IState> {
	private shakeTimeout?: number;

	public componentWillMount(): void {
		// Initial state.
		this.setState({
			offset: 0
		});

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

	public componentDidUpdate(prevProps: IProps, prevState: IState): void {
		// Scroll messages when messages prop changes, and when status is shown/hidden
		// TODO: isScrolled() will not work on this position, since it has already been scrolled automatically.
		if (this.isScrolled() && prevProps.messages && this.props.messages.length !== prevProps.messages.length
			|| (prevState.status !== this.state.status && (!prevState.status || !this.state.status))) {
			this.scrollMessages();
		}

		// TODO: Possibly messing up stuff.
		//this.$messages.current.scrollTop = this.$messages.current.scrollHeight;

		// TODO: componentDidUpdate() may trigger in unwanted situations, such as on receive message.
		//this.focus();

		// Set the pending done timeout if it is not already set. Override if already exists.
		if (this.state.shaking) {
			clearTimeout(this.shakeTimeout);

			// TODO: Timeout is bound to CSS time value.
			(this.shakeTimeout as any) = setTimeout(() => {
				this.setState({
					shaking: false
				})
			}, 90);
		}
	}

	public componentWillUnmount(): void {
		// Clear shake timeout once the component unmounts to prevent leaving garbage behind.
		clearTimeout(this.shakeTimeout as any);
	}

	public render(): JSX.Element {
		return (
			<div className="chat">
				<ChatHeader />
				<ChatContainer messages={undefined as any} offsetMultiplier={1} />

				{/* TODO */}
				<ChatComposer autoCompleteVisible={undefined as any} />
			</div>
		);
	}
}
export default connect((state: IAppState): any => {
	return {
		activeChannel: state.category.activeChannel,
		inputLocked: state.misc.inputLocked,
		autoCompleteCommands: state.category.commandHandler.getAllAsAutoCompleteCommands(),
		commandHandler: state.category.commandHandler,
		users: state.user.users
	};
})(Chat);
