import React, {CSSProperties} from "react";
import "../styles/tooltip.scss";
import {CSSTransition} from "react-transition-group";

export enum TooltipPosition {
    Top,
    Right,
    Left,
    Bottom
}

interface ILocalProps {
    readonly text: string;
    readonly style?: CSSProperties;
    readonly position: TooltipPosition;
}

interface ILocalState {
    readonly visible: boolean;
}

export default class Tooltip extends React.Component<ILocalProps, ILocalState> {
    public constructor(props: ILocalProps) {
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

    public getTooltipClasses(): string {
        const classes: string[] = ["tooltip"];

        switch (this.props.position) {
            case TooltipPosition.Top: {
                break;
            }

            case TooltipPosition.Left: {
                classes.push("pos-left");

                break;
            }

            case TooltipPosition.Right: {
                classes.push("pos-right");

                break;
            }

            case TooltipPosition.Bottom: {
                classes.push("pos-bottom");

                break;
            }

            default: {
                throw new Error(`[Tooltip] Unknown/invalid tooltip position: ${this.props.position}`);
            }
        }

        return classes.join(" ");
    }

    public render(): JSX.Element {
        return (
            <div style={this.props.style} onMouseOver={this.show} onMouseLeave={this.hide} className="tooltip-container">
                <CSSTransition in={this.state.visible} classNames="trans" timeout={200}>
                    <div className={this.getTooltipClasses()}>{this.props.text}</div>
                </CSSTransition>
                {this.props.children}
            </div>
        );
    }
}
