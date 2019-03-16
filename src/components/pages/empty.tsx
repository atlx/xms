import React, {Component} from "react";
import "../../styles/pages/empty.scss";
import Tooltip, {TooltipPosition} from "../tooltip";
import CloseButton from "../closeButton";

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
    public renderCloseButton(): JSX.Element {
        const closeButton: JSX.Element = <CloseButton onClick={this.props.onClose} />;

        if (this.props.closeTooltip !== undefined) {
            return (
                <Tooltip text={this.props.closeTooltip} position={TooltipPosition.Left}>
                    {closeButton}
                </Tooltip>
            );
        }

        return closeButton;
    }

    public getClass(): string {
        const classes: string[] = ["empty-page"];

        if (this.props.className !== undefined) {
            classes.push(this.props.className);
        }

        return classes.join(" ");
    }

    public render(): JSX.Element {
        return (
            <div className={this.getClass()}>
                {this.renderCloseButton()}
                {this.props.children}
            </div>
        );
    }
}
