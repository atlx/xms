import React from "react";
import "@/styles/chat/breakMessage.scss";

type Props = {
    readonly content: string;

    readonly important: boolean;
};

export default class BreakMessage extends React.Component<Props> {
    public static defaultPropts: Partial<Props> = {
        important: false
    };

    public render(): JSX.Element {
        return (
            <div data-important={this.props.important} className="break-message">
                {this.props.content}
                <div className="line"></div>
            </div>
        );
    }
}
