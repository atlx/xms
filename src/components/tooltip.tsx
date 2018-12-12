import React from "react";
import "../styles/tooltip.scss";
import {CSSTransition} from "react-transition-group";

type TooltipProps = {
    readonly text: string;
}

type TooltipState = {
    readonly visible: boolean;
}

export default class Tooltip extends React.Component<TooltipProps, TooltipState> {
    public constructor(props: TooltipProps) {
        super(props);

        // Bindings
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.setVisibility = this.setVisibility.bind(this);
    }

    public componentWillMount(): void {
        this.setState({
            visible: false
        });
    }

    public setVisibility(visible: boolean): void {
        if (this.state.visible !== visible) {
            this.setState({
                visible
            });
        }
    }

    public show(): void {
        this.setVisibility(true);
    }

    public hide(): void {
        this.setVisibility(false);
    }

    public render(): JSX.Element {
        return (
            <div onMouseOver={this.show} onMouseLeave={this.hide} className="tooltip-container">
                <CSSTransition in={this.state.visible} classNames="trans" timeout={150}>
                    <div className="tooltip">{this.props.text}</div>
                </CSSTransition>
                {this.props.children}
            </div>
        );
    }
}