import React from "react";
import "../styles/chat-message.scss";

interface ChatMessageProps {
    readonly authorName: string;
    readonly authorAvatarUrl: string;
    readonly time: number;
    readonly content: string;
    readonly systemMessage: boolean;
}

export default class ChatMessage extends React.Component<ChatMessageProps> {
	public render() {
		return (
			<div className="chat-message">
                <div className="header">
                    <div className="author-name">{this.props.authorName}</div>
                </div>
                <div className="text">{this.props.content}</div>
			</div>
		);
	}
}
