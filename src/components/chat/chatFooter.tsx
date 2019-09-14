import React, {Component} from "react";
import "@/styles/chat/chatFooter.scss";

type Props = {
    /**
     * The current value of the input element.
     */
    readonly value: string;

    /**
     * The max value length of the input element.
     */
    readonly maxLength: number;
};

type State = {
    readonly status?: string;
};

export default class ChatFooter extends Component<Props, State> {
    public state: State = {
        status: undefined
    };

    /**
     * Callback invoked when the input element's value is changed.
     */
    public handleValueChange(): void {
        // Create length variables for conviniency.
        const valueLength: number = this.props.value.length;
        const threshold: number = Math.round(this.props.maxLength / 5);

        // Update/show character counter if threshold is met, and is not at max length.
        if (valueLength > threshold && valueLength <= this.props.maxLength) {
            this.setState({
                status: `${this.props.maxLength - valueLength} characters left`
            });
        }
        // Length does not exceed threshold, hide the counter.
        else {
            this.setState({
                status: undefined
            });
        }
    }

    public render(): JSX.Element {
        return (
            <div className="chat-footer">
                <div className="typing"></div>
                <div className="status">{this.state.status}</div>
            </div>
        );
    }
}
