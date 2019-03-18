import React, {Component, CSSProperties} from "react";
import "../styles/misc/indicator.scss";

export enum IndicatorColor {
    /**
     * Default color.
     */
    Gray = "#afafaf",

    Red = "#ff4141"
}

interface IProps {
    readonly className?: string;

    /**
     * Whether the indicator is visible. Defaults to false.
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

export default class Indicator extends Component<IProps> {
    public static defaultProps: Partial<IProps> = {
        color: IndicatorColor.Gray,
        size: 10,
        visible: false
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
            backgroundColor: this.props.color,
            height: `${this.props.size}px`,
            width: `${this.props.size}px`
        };
    }

    public render(): JSX.Element {
        return (
            <div hidden={!this.props.visible} style={this.getStyle()} className={this.getClass()} />
        );
    }
}
