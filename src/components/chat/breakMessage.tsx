import React from "react";
import "../../styles/chat/breakMessage.scss";

interface ILocalProps {
    readonly content: string;
}

export default class BreakMessage extends React.Component<ILocalProps> {
    public render(): JSX.Element {
        return (
            <div className="break-message">
                {this.props.content}
                <div className="line"></div>
            </div>
        );
    }
}
