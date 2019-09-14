import React from "react";
import "@/styles/chat/noticeMessage.scss";
import {NoticeStyle} from "../../models/message";

type Props = {
	readonly text: string;

	readonly style: NoticeStyle;
};

// TODO: Be able to specify color.
export default class NoticeMessage extends React.Component<Props> {
	public render(): JSX.Element {
		return (
			<div data-style={this.props.style} className="notice-message">
				{this.props.text}
			</div>
		);
	}
}
