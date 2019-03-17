import React, {Component} from "react";
import "../../styles/pages/empty.scss";
import Tooltip, {TooltipPosition} from "../tooltip";
import HandleButton from "../handleBar/handleButton";

interface ILocalProps {
    readonly className?: string;

    /**
     * Callback to invoke once the close button is clicked.
     * Defaults to closing the application.
     */
    readonly onClose?: () => void;

    /**
     * The tooltip to display when hovering the close button.
     * Defaults to omitting tooltip.
     */
    readonly closeTooltip?: string;
}

export default class EmptyPage extends Component<ILocalProps> {
    public getClass(): string {
        const classes: string[] = ["empty-page"];

        if (this.props.className !== undefined) {
            classes.unshift(this.props.className);
        }

        return classes.join(" ");
    }

    public render(): JSX.Element {
        return (
            <div className={this.getClass()}>
                {this.props.children}
            </div>
        );
    }
}
