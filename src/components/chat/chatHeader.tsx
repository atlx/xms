import {Component} from "react";
import React from "react";
import "@styles/chat/chatHeader.scss";
import {FontAwesomeIcon} from "@/fortawesome/react-fontawesome";
import {faHashtag} from "@/fortawesome/free-solid-svg-icons";
import {IChannel} from "@/models/channel";

type Props = {
    readonly activeChannel: IChannel;
};

export default class ChatHeader extends Component<Props> {
    public render(): JSX.Element {
        return (
            <div className="chat-header">
                <div className="channel-title"><FontAwesomeIcon icon={faHashtag} /> {this.props.activeChannel.name}</div>
                <div className="channel-topic">{this.props.activeChannel.topic}</div>
            </div>
        );
    }
}
