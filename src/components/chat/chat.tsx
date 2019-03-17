import React, {RefObject} from "react";
import "../../styles/chat/chat.scss";
import {connect} from "react-redux";
import {IAppState} from "../../store/store";
import Actions from "../../store/actions";
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
	readonly autoCompleteVisible: boolean;
	readonly commandHandler: CommandHandler;
	readonly autoCompleteCommands: IGuideItem[];
	readonly users: ImmutableMap<UniqueId, User>;
}

interface IState {
	//
}

class Chat extends React.Component<IProps, IState> {
	private readonly $loader: RefObject<any> = React.createRef();
	private readonly $composer: RefObject<ChatComposer> = React.createRef();

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

	public getWrapperClass(): string {
		const classes: string[] = ["message-wrapper"];

		if (this.props.inputLocked) {
			classes.push("disabled");
		}

		// Add the shaking animation class.
		if (this.state.shaking) {
			classes.push("shaking");
		}

		return classes.join(" ");
	}

	public render(): JSX.Element {
		return (
			<div className="chat">
				<ChatHeader />
				<ChatContainer />
				<ChatComposer ref={this.$composer} />
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState): any => {
	return {
		messages: state.message.messages,
		activeChannel: state.category.activeChannel,
		inputLocked: state.misc.inputLocked,
		autoCompleteVisible: state.misc.autoCompleteVisible,
		autoCompleteCommands: state.category.commandHandler.getAllAsAutoCompleteCommands(),
		commandHandler: state.category.commandHandler,
		users: state.user.users
	};
};

export default connect(mapStateToProps)(Chat);
