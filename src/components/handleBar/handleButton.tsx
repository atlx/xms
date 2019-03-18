import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import App from "../../core/app";
import "../../styles/handleBar/handleButton.scss";

interface IProps {
    readonly className?: string;

    /**
     * Callback to invoke once the button is pressed.
     * Defaults to closing the application.
     */
    readonly onClick?: () => void;
}

export default class HandleButton extends Component<IProps> {
    public static defaultProps: Partial<IProps> = {
        // TODO: Doesn't want to accept directly.
        onClick: () => {
            App.close()
        }
    };

    public getClass(): string {
        const classes: string[] = ["handle-button"];

        if (this.props.className !== undefined) {
            classes.push(this.props.className);
        }

        return classes.join(" ");
    }

    public invokeCallback(): void {
        if (this.props.onClick !== undefined) {
            this.props.onClick();
        }
    }
    
    public render(): JSX.Element {
        return (
            <div onClick={() => this.invokeCallback()} className={this.getClass()}>
                <FontAwesomeIcon icon={faTimes} className="button" />
            </div>
        );
    }
}
