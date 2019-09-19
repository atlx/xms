import React from "react";
import "@styles/chat/chatMessage.scss";
import Pattern from "@/core/pattern";
import UserMention from "./userMention";
import Indicator, {IndicatorColor} from "../indicator";
import Tooltip, {TooltipPosition} from "../tooltip";

// TODO: Use the GenericMessage/IMessage for this?
type Props = {
    readonly authorName: string;

    readonly authorAvatarHash?: string;

    readonly time: number;

    readonly text: string;

    readonly systemMessage: boolean;

    readonly sent: boolean;

    readonly className?: string;

    /**
     * This message indicates a signal to the user. Defaults to false.
     */
    readonly notify?: boolean;
};

export default class ChatMessage extends React.Component<Props> {
    public getClass(): string {
        const classes: string[] = ["chat-message"];

        if (this.props.sent === true) {
            classes.push("sent");
        }

        if (this.props.className !== undefined) {
            classes.push(this.props.className);
        }

        return classes.join(" ");
    }

    public renderContent(): Array<JSX.Element | string> {
        const content: Array<JSX.Element | string> = [];

        let text: string = this.props.text;

        // Test text for absolute mentions.
        if (Pattern.absoluteMention.test(text)) {
            // Convert absolute mentions to elements.
            for (const match of Pattern.absoluteMention.exec(text)!) {
                const index: number = text.indexOf(match);

                // Append the text from start to matched index.
                content.push(text.substring(0, index));

                // Append the user mention.
                content.push(
                    // TODO
                    <UserMention key={"f"} id="atlas" />
                );

                // Set the text to start after skipping user mention, and continue.
                text = text.substring(index + match.length);
            }
        }

        // Always append remaining text.
        content.push(text);

        return content;
    }

    public render(): JSX.Element {
        return (
            <div className={this.getClass()}>
                {this.props.notify &&
                    <Tooltip position={TooltipPosition.Left} text="You were mentioned">
                        <Indicator visible color={IndicatorColor.Red} />
                    </Tooltip>
                }
                <div className="header">
                    <div className="author-name">{this.props.authorName}</div>
                </div>
                <div className="text">{this.renderContent()}</div>
            </div>
        );
    }
}
