import React, {RefObject} from "react";
import "../styles/chat.scss";
import {connect} from "react-redux";
import {AppState} from "../store/store";
import {IMessage, IGenericMessage, MessageType, Channel} from "../types/types";
import ChatMessage from "./chat-message";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";
import Actions from "../store/actions";
import {app} from "..";
import Utils from "../core/utils";
import NoticeMessage from "./notice-message";
import Loader from "./loader";

type ChatProps = {
	readonly messages: IGenericMessage[];
	readonly activeChannel: Channel;
	readonly inputLocked: boolean;
}

class Chat extends React.Component<ChatProps> {
	private readonly $message: RefObject<any>;
	private readonly $messages: RefObject<any>;
	private readonly $loader: RefObject<any>;

	private offset: number;

	public constructor(props: ChatProps) {
		super(props);

		this.offset = props.messages.length;

		// Bindings
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.loadOlderMessages = this.loadOlderMessages.bind(this);

		// Refs
		this.$message = React.createRef();
		this.$messages = React.createRef();
		this.$loader = React.createRef();
	}

	public componentDidUpdate(): void {
		this.$messages.current.scrollTop = this.$messages.current.scrollHeight;
	}

	public renderMessages(): JSX.Element[] {
		let messages: IGenericMessage[] = this.props.messages;

		console.log(messages);

		if (this.offset !== messages.length) {
			messages = messages.slice(-this.offset);
		}
		
		console.log(messages);

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

	public handleKeyDown(e: any): void {
		if (this.props.activeChannel.id !== null && e.key === "Enter") {
			const text: string = this.$message.current.value.trim();

			this.$message.current.value = "";

			// Avoid sending empty messages
			if (text === "") {
				return;
			}

			const message: IMessage = Utils.generateMessage(this.props.activeChannel.id, text);

			Actions.addMessage(message);
			app.actions.sendMessage(message);
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
		// TODO: Hard-coded value
		// TODO: Timeout for debugging (slower)
		setTimeout(() => {
			this.offset += 5;
			this.forceUpdate();
		}, 1500);
	}

	public renderLoader(): JSX.Element | undefined {
		// TODO: Hard-coded threshold
		if (this.props.messages.length >= 15) {
			if (this.$messages.current && this.$messages.current.scrollTop === 0) {
				this.loadOlderMessages();
			}
			else {
				return <Loader ref={this.$loader} text="Loading messages" />
			}
		}
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
					<input
						ref={this.$message}
						onKeyDown={this.handleKeyDown}
						placeholder="Type a message"
						className="message"
						disabled={this.props.inputLocked}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): ChatProps => {
	return {
		messages: state.messages,
		activeChannel: state.activeChannel,
		inputLocked: state.inputLocked
	};
};

export default connect(mapStateToProps)(Chat);
