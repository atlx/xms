import React from "react";
import "../styles/chat-message.scss";

// TODO: Use the GenericMessage/IMessage for this?
interface ChatMessageProps {
    readonly authorName: string;
    readonly authorAvatarUrl: string | null;
    readonly time: number;
    readonly content: string;
    readonly systemMessage: boolean;
    readonly sent: boolean;
}

export default class ChatMessage extends React.Component<ChatMessageProps> {
    public getComponentClass(): string {
        const classes: string[] = ["chat-message"];

        if (this.props.sent) {
            classes.push("sent");
        }

        return classes.join(" ");
    }

	public render(): JSX.Element {
		return (
			<div className={this.getComponentClass()}>
                <div className="header">
                    <div className="author-name">{this.props.authorName}</div>
                </div>
                <div className="text">{this.props.content}</div>
			</div>
		);
	}
}
