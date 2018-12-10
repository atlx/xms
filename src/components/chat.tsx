import React, {RefObject} from "react";
import "../styles/chat.scss";
import {connect} from "react-redux";
import {AppState} from "../store/store";
import {IMessage, UniqueId, IGenericMessage, MessageType} from "../types/types";
import ChatMessage from "./chat-message";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";
import Actions from "../store/actions";
import {app} from "..";
import Utils from "../core/utils";
import NoticeMessage from "./notice-message";

type ChatProps = {
	readonly messages: IGenericMessage[];
	readonly activeChannelId: UniqueId | null;
	readonly inputLocked: boolean;
}

class Chat extends React.Component<ChatProps> {
	private readonly $message: RefObject<any>;

	public constructor(props: any) {
		super(props);

		// Bindings
		this.handleKeyDown = this.handleKeyDown.bind(this);

		// Refs
		this.$message = React.createRef();
	}

	public componentDidMount(): void {
		this.$message.current.focus();
	}

	public renderMessages(): JSX.Element[] {
		return this.props.messages.map((message: IGenericMessage) => {

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
		if (this.props.activeChannelId !== null && e.key === "Enter") {
			const text: string = this.$message.current.value.trim();

			this.$message.current.value = "";

			// Avoid sending empty messages
			if (text === "") {
				return;
			}

			const message: IMessage = Utils.generateMessage(this.props.activeChannelId, text);

			Actions.addMessage(message);
			app.actions.sendMessage(message);
		}
	}

	public render(): JSX.Element {
		return (
			<div className="chat">
				<div className="header">
					<div className="channel-title"><FontAwesomeIcon icon={faHashtag} /> General</div>
				</div>
				<div className="messages">
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
		activeChannelId: state.activeChannel !== null ? state.activeChannel.id : null,
		inputLocked: state.inputLocked
	};
};

export default connect(mapStateToProps)(Chat);
