import React, {RefObject} from "react";
import "../styles/chat.scss";
import {connect} from "react-redux";
import {AppState, store} from "../store/store";
import {Message} from "../types/types";
import ChatMessage from "./chat-message";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";
import Actions from "../store/actions";

class Chat extends React.Component<any> {
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
		return this.props.messages.map((message: Message) => {
			return <ChatMessage
				key={message.id}
				authorName={message.authorName}
				authorAvatarUrl={message.authorAvatarUrl}
				content={message.text}
				time={message.time}
				systemMessage={message.systemMessage}
			/>
		});
	}

	public handleKeyDown(e: any): void {
		if (e.key === "Enter") {
			const text: string = this.$message.current.value;

			this.$message.current.value = "";

			Actions.addPartialMessage({
				text
			});
		}
	}

	public render() {
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
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): any => {
    return {
		messages: state.messages
    };
};

export default connect(mapStateToProps)(Chat);
