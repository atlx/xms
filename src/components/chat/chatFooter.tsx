import React, {Component} from "react";
import "../../styles/chat/chatFooter.scss";

interface IState {
    readonly status?: string;
}

export default class ChatFooter extends Component<{}, IState> {
    public state: IState = {
        status: undefined
    };

    public render(): JSX.Element {
        return (
            <div className="chat-footer">
                <div className="typing"></div>
                <div className="status">{this.state.status}</div>
            </div>
        );
    }
}
