import React, {Component} from "react";
import "@styles/placeholder/avatar.scss";

type Props = {
    readonly username: string;
};

export default class PlaceholderAvatar extends Component<Props> {
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
