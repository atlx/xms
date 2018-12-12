import React, {RefObject} from "react";
import "../styles/chat.scss";
import {connect} from "react-redux";
import {AppState} from "../store/store";
import {IMessage, IGenericMessage, MessageType, IChannel, IAutoCompleteItem} from "../types/types";
import ChatMessage from "./chat-message";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";
import Actions from "../store/actions";
import {app} from "..";
import Utils from "../core/utils";
import NoticeMessage from "./notice-message";
import Loader from "./loader";
import {CSSTransition} from "react-transition-group";
import Autocompleter from "./autocompleter";
import CommandHandler from "../core/command-handler";
import Factory from "../core/factory";

type ChatProps = {
	readonly messages: IGenericMessage[];
	readonly activeChannel: IChannel;
	readonly inputLocked: boolean;
	readonly offsetMultiplier: number;
	readonly autoCompleteVisible: boolean;
	readonly commandHandler: CommandHandler;
}

type ChatState = {
	readonly offset: number;
	readonly autoCompleteItems: IAutoCompleteItem[];
}

class Chat extends React.Component<ChatProps, ChatState> {
	private readonly $message: RefObject<any>;
	private readonly $messages: RefObject<any>;
	private readonly $loader: RefObject<any>;

	public constructor(props: ChatProps) {
		super(props);

		// Bindings
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.getCommandName = this.getCommandName.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.loadOlderMessages = this.loadOlderMessages.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.getValue = this.getValue.bind(this);
		this.handleAutoCompleteItemClick = this.handleAutoCompleteItemClick.bind(this);

		// Refs
		this.$message = React.createRef();
		this.$messages = React.createRef();
		this.$loader = React.createRef();
	}

	public componentWillMount(): void {
		this.setState({
			offset: 0
		});

		this.resetAutoCompleteCommands();
	}

	// TODO: Possibly messing up stuff
	public componentDidUpdate(): void {
		this.$messages.current.scrollTop = this.$messages.current.scrollHeight;
	}

	public resetAutoCompleteCommands(): void {
		this.setState({
			autoCompleteItems: this.props.commandHandler.getAllAsAutoCompleteCommands()
		});
	}

	public renderMessages(): JSX.Element[] {
		let messages: IGenericMessage[] = this.props.messages;

		//console.log(messages);

		// TODO: Debugging commented out
		/* if (this.offset !== messages.length) {
			messages = messages.slice(-this.offset);
		} */

		//console.log(messages);

		return messages.map((message: IGenericMessage) => {
			if (message.type === MessageType.Text) {
				const textMessage: IMessage = message as IMessage;

				return <ChatMessage
					key={message.id}
					sent={textMessage.sent}
					authorName={textMessage.authorName}
					authorAvatarUrl={textMessage.authorAvatarUrl}
					content={message.text}
					time={textMessage.time}
					systemMessage={textMessage.systemMessage}
				/>;
			}
			else if (message.type === MessageType.Notice) {
				// No need to cast for now
				return <NoticeMessage
					key={message.id}
					text={message.text}
				/>;
			}
			else {
				throw new Error(`[Chat] Unknown message type: ${message.type}`);
			}
		});
	}

	public getValue(): string {
		return this.$message.current.value.trim();
	}

	public setValue(value: string): void {
		this.$message.current.value = value.trim();
	}

	public focus(): void {
		this.$message.current.focus();
	}

	public clearValue(): string {
		const value: string = this.getValue();

		this.setValue("");

		return value;
	}

	public appendValue(value: string): void {
		this.setValue(this.getValue() + value);
	}

	public getCommandName(): string {
		return this.getValue().substr(1).split(" ")[0].toLowerCase();
	}

	public inCommand(): boolean {
		return this.getValue()[0] === "/";
	}

	public filterAutoCompleteItems(): void {
		const command: string = this.getCommandName();

		if (command.length >= 1) {
			this.setState({
				autoCompleteItems: this.state.autoCompleteItems.filter((item: IAutoCompleteItem) =>
					item.name.toLowerCase().startsWith(command))
			});
		}
	}

	public handleKeyDown(e: any): void {
		const value: string = this.getValue();

		if (this.props.activeChannel.id !== null && e.key === "Enter") {
			// Avoid sending empty messages
			if (value === "") {
				return;
			}
			// Handle command messages internally
			else if (value.startsWith("/")) {
				// TODO: Pass in arguments
				this.props.commandHandler.handle(this.getCommandName());
				this.clearValue();

				return;
			}

			const message: IMessage = Factory.createMessage(this.props.activeChannel.id, value);

			this.clearValue();
			Actions.addMessage(message);
			app.actions.sendMessage(message);
		}
		else if (value.length === 0 && e.key === "/") {
			Actions.setAutoCompleteVisible(true);
		}
		else if (this.inCommand()) {
			// Filter values in auto complete
		}
	}

	public handleKeyUp(e: any): void {
		const value: string = this.getValue();

		if (value[0] !== "/" && this.props.autoCompleteVisible) {
			Actions.setAutoCompleteVisible(false);
		}
		else if (e.key === "Backspace" && this.props.autoCompleteVisible) {
			this.resetAutoCompleteCommands();
			this.filterAutoCompleteItems();
		}
		else if (this.props.autoCompleteVisible) {
			this.filterAutoCompleteItems();
		}
	}

	public handleScroll(): void {
		// TODO: Hard-coded threshold
		if (this.props.messages.length < 15) {
			return;
		}
		else if (this.$messages.current.scrollTop === 0) {
			this.loadOlderMessages();
		}
	}

	public loadOlderMessages(): void {
		// TODO: Timeout for debugging (slower)
		setTimeout(() => {
			this.setState({
				offset: this.state.offset + 1
			});
		}, 1500);
	}

	public renderLoader(): JSX.Element | undefined {
		// TODO: Hard-coded threshold
		if (this.props.messages.length >= 15) {
			if (this.$messages.current && this.$messages.current.scrollTop === 0) {
				if (this.props.offsetMultiplier * this.state.offset > this.props.messages.length) {
					return <div className="beginning-of-history">Beginning of history</div>;
				}

				this.loadOlderMessages();
			}
			else {
				return <Loader ref={this.$loader} text="Loading messages" />
			}
		}
	}

	public handleAutoCompleteItemClick(item: IAutoCompleteItem): void {
		const value: string = this.getValue();

		// Append without a space if typing out command
		if (!value.includes(" ")) {
			this.appendValue(item.name.toLowerCase());
		}
		// Otherwise append with a leading space
		else {
			this.appendValue(" " + item.name.toLowerCase());
		}

		// Focus input after appending data
		this.focus();
	}

	public render(): JSX.Element {
		return (
			<div className="chat">
				<div className="header">
					<div className="channel-title"><FontAwesomeIcon icon={faHashtag} /> {this.props.activeChannel.name}</div>
					<div className="channel-topic">{this.props.activeChannel.topic}</div>
				</div>
				<div ref={this.$messages} onScroll={this.handleScroll} className="messages">
					{this.renderLoader()}
					{this.renderMessages()}
				</div>
				<div className="input">
					<Autocompleter
						onItemClick={this.handleAutoCompleteItemClick}
						title="Commands"
						visible={this.props.autoCompleteVisible}
						items={this.state.autoCompleteItems}
					/>
					<CSSTransition in={this.props.inputLocked} classNames="trans" timeout={300}>
						<input
							ref={this.$message}
							onKeyDown={this.handleKeyDown}
							onKeyUp={this.handleKeyUp}
							placeholder="Type a message"
							className="message"
							disabled={this.props.inputLocked}
							maxLength={300}
						/>
					</CSSTransition>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): any => {
	return {
		messages: state.messages,
		activeChannel: state.activeChannel,
		inputLocked: state.inputLocked,
		autoCompleteVisible: state.autoCompleteVisible,
		commandHandler: state.commandHandler
	};
};

export default connect(mapStateToProps)(Chat);
