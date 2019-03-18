import {Component} from "react";
import {UniqueId} from "../../models/misc";
import React from "react";
import "../../styles/chat/userMention.scss";

interface IProps {
    readonly id: UniqueId;
    readonly username?: string;
}

export default class UserMention extends Component<IProps> {
    protected renderContent(): string {
        return this.props.username || this.props.id;
    }

    public render(): JSX.Element {
        return (
            <div className="user-mention">
                @{this.renderContent()}
            </div>
        );
    }
}
