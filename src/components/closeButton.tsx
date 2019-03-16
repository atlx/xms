import React, {Component} from "react";
import {remote} from "electron";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import "../styles/misc/closeButton.scss";

export interface ILocalProps {
    readonly className?: string;
}

export default class CloseButton extends Component<ILocalProps> {
    public closeApp(): void {
		remote.getCurrentWindow().close();
    }

    public getClass(): string {
        const classes: string[] = ["close-button"];

        if (this.props.className !== undefined) {
            classes.push(this.props.className);
        }

        return classes.join(" ");
    }
    
    public render(): JSX.Element {
        return (
            <div onClick={() => this.closeApp()} className={this.getClass()}>
                <FontAwesomeIcon icon={faTimes} className="button" />
            </div>
        );
    }
}
