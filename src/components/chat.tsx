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
import {CSSTransition} from "react-transition-group";

type ChatProps = {
	readonly messages: IGenericMessage[];
	readonly activeChannel: Channel;
	readonly inputLocked: boolean;
	readonly offsetMultiplier: number;
}

type ChatState = {
	readonly offset: number;
}

class Chat extends React.Component<ChatProps, ChatState> {
	private readonly $message: RefObject<any>;
	private readonly $messages: RefObject<any>;
	private readonly $loader: RefObject<any>;

	public constructor(props: ChatProps) {
		super(props);

		// Bindings
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.loadOlderMessages = this.loadOlderMessages.bind(this);

		// Refs
		this.$message = React.createRef();
		this.$messages = React.createRef();
		this.$loader = React.createRef();
	}

	public componentDidMount(): void {
		this.setState({
			offset: 0
		});
	}

	public componentDidUpdate(): void {
		this.$messages.current.scrollTop = this.$messages.current.scrollHeight;
	}

	public renderMessages(): JSX.Element[] {
		let messages: IGenericMessage[] = this.props.messages;

		console.log(messages);

		// TODO: Debugging commented out
		/* if (this.offset !== messages.length) {
			messages = messages.slice(-this.offset);
		} */

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
					<CSSTransition in={this.props.inputLocked} classNames="trans" timeout={400}>
						<input
							ref={this.$message}
							onKeyDown={this.handleKeyDown}
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
		inputLocked: state.inputLocked
	};
};

export default connect(mapStateToProps)(Chat);
