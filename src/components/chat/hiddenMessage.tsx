import React, {Component} from "react";
import ChatMessage from "./chatMessage";
import "@/styles/chat/hiddenMessage.scss";

export default class HiddenMessage extends Component {
    public render(): JSX.Element {
        return (
            <div className="hidden-message">
                <ChatMessage
                    authorName="Anonymous"
                    text="Hello world"
                    time={0}
                    sent={true}
                    systemMessage={false}
                />
                <div className="text">Hover to view</div>
            </div>
        );
    }
}
