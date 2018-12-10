import React from "react";
import "../styles/notice-message.scss";

type NoticeMessageProps = {
	readonly text: string;
}

/* TODO: Be able to specify color */
export default class NoticeMessage extends React.Component<NoticeMessageProps> {
	public render(): JSX.Element {
		return (
			<div className="notice-message">
				{this.props.text}
			</div>
		);
	}
}
