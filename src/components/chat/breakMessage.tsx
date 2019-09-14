import React from "react";
import "@/styles/chat/breakMessage.scss";

interface IProps {
    readonly content: string;
    readonly important: boolean;
}

export default class BreakMessage extends React.Component<IProps> {
    public static defaultPropts: Partial<IProps> = {
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
