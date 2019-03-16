import React from "react";
import "../../styles/chat/chatMessage.scss";
import Pattern from "../../core/pattern";
import UserMention from "./userMention";
import Indicator, {IndicatorColor} from "../indicator";

// TODO: Use the GenericMessage/IMessage for this?
interface ILocalProps {
    readonly authorName: string;
    readonly authorAvatarHash?: string;
    readonly time: number;
    readonly text: string;
    readonly systemMessage: boolean;
    readonly sent: boolean;

    /**
     * This message indicates a signal to the user. Defaults to false.
     */
    readonly notify?: boolean;
}

export default class ChatMessage extends React.Component<ILocalProps> {
    public getComponentClass(): string {
        const classes: string[] = ["chat-message"];

        if (this.props.sent) {
            classes.push("sent");
        }

        return classes.join(" ");
    }

    public renderContent(): JSX.Element[] {
        const content: JSX.Element[] = [<div key="text">{this.props.text}</div>];

        // Test text for absolute mentions.
        if (Pattern.absoluteMention.test(this.props.text)) {
            // Convert absolute mentions to elements.
            for (const match of Pattern.absoluteMention.exec(this.props.text)!) {
                // TODO
                content.push(
                    <UserMention key={"f"} id="someid" />
                );
            }
        }

        return content;
    }

    public render(): JSX.Element {
        return (
            <div className={this.getComponentClass()}>
                <Indicator visible={this.props.notify} color={IndicatorColor.Red} />
                <div className="header">
                    <div className="author-name">{this.props.authorName}</div>
                </div>
                <div className="text">{this.renderContent()}</div>
            </div>
        );
    }
}
