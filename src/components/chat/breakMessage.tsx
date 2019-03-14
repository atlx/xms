import React from "react";
import "../../styles/chat/breakMessage.scss";

interface ILocalProps {
    readonly content: string;
    readonly important: boolean;
}

export default class BreakMessage extends React.Component<ILocalProps> {
    public static defaultPropts: Partial<ILocalProps> = {
        important: false
    };

    public getClass(): any {
        const classes: string[] = ["break-message"];

        if (this.props.important) {
            classes.push("important");
        }

        return classes.join(" ");
    }

    public render(): JSX.Element {
        return (
            <div className={this.getClass()}>
                {this.props.content}
                <div className="line"></div>
            </div>
        );
    }
}
