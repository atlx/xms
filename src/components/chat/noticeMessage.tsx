import React from "react";
import "../../styles/chat/noticeMessage.scss";
import {NoticeStyle} from "../../models/message";

interface ILocalProps {
	readonly text: string;
	readonly style: NoticeStyle;
}

// TODO: Be able to specify color.
export default class NoticeMessage extends React.Component<ILocalProps> {
	public getClasses(): string {
		const classes = ["notice-message"];

		switch (this.props.style) {
			case NoticeStyle.Success: {
				classes.push("success");

				break;
			}

			case NoticeStyle.Warning: {
				classes.push("warning");

				break;
			}

			case NoticeStyle.Error: {
				classes.push("error");

				break;
			}

			default: {
				throw new Error(`[NoticeMessage] Unknown/invalid notice style: ${this.props.style}`);
			}
		}

		return classes.join(" ");
	}

	public render(): JSX.Element {
		return (
			<div className={this.getClasses()}>
				{this.props.text}
			</div>
		);
	}
}
