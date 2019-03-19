import React, {Component} from "react";
import "../../styles/placeholder/avatar.scss";

interface IProps {
    readonly username: string;
}

export default class PlaceholderAvatar extends Component<IProps> {
    protected getInitial(): string {
        return this.props.username.substring(0, 1);
    }

    public render(): JSX.Element {
        return (
            <div className="placeholder-avatar">
                <div className="background" />
                <div className="initial">{this.getInitial()}</div>
            </div>
        );
    }
}
