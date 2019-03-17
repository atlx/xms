import React, {Component, CSSProperties} from "react";
import "../styles/misc/indicator.scss";

export enum IndicatorColor {
    /**
     * Default color.
     */
    Gray = "#afafaf",

    Red = "#ff4141"
}

interface ILocalProps {
    readonly className?: string;

    /**
     * Whether the indicator is visible.
     */
    readonly visible?: boolean;

    /**
     * The color of the indicator in hex form. Defaults to '#afafaf'.
     */
    readonly color?: IndicatorColor | string;

    /**
     * The indicator size in pixels. Defaults to '10px'.
     */
    readonly size?: number;
}

export default class Indicator extends Component<ILocalProps> {
    public static defaultProps: Partial<ILocalProps> = {
        color: IndicatorColor.Gray,
        size: 10
    };

    public getClass(): string {
        const classes: string[] = ["indicator"];

        if (this.props.className !== undefined) {
            classes.push(this.props.className);
        }

        return classes.join(" ");
    }

    public getStyle(): CSSProperties {
        return {
            display: this.props.visible === true ? "block" : "none",
            backgroundColor: this.props.color,
            height: `${this.props.size}px`,
            width: `${this.props.size}px`
        };
    }

    public render(): JSX.Element {
        return (
            <div style={this.getStyle()} className={this.getClass()} />
        );
    }
}
