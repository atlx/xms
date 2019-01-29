import React from "react";
import "../styles/status-action.scss";
import StatusAction, {IStatusActionProps} from "./status-action";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface ILocalProps extends IStatusActionProps {
    /**
     * Whether the toggle is toggled. Defaults to true.
     */
    readonly toggled?: boolean;

    /**
     * The icon to display when the toggle is toggled.
     */
    readonly on: IconProp;

    /**
     * The icon to display when the toggle is not toggled.
     */
    readonly off: IconProp;
}

interface ILocalState {
    readonly toggled: boolean;
}

/**
 * A toggable status bar action.
 */
export default class StatusToggle extends React.Component<ILocalProps, ILocalState> {
    public readonly state = {
        toggled: this.props.toggled !== undefined ? this.props.toggled : true
    };

    public computeClassNames(): string {
        const classes: string[] = ["status-action"];

        if (this.props.onClick !== undefined) {
            classes.push("clickable");
        }

        return classes.join(" ");
    }

    public getIcon(): IconProp {
        if (this.state.toggled) {
            return this.props.on;
        }

        return this.props.off;
    }

    public handleClick(): void {
        this.setState({
            toggled: !this.state.toggled
        });

        if (this.props.onClick !== undefined) {
            this.props.onClick();
        }
    }

    public render(): JSX.Element {
        return (
            <StatusAction {...this.props}
                onClick={() => this.handleClick()}><FontAwesomeIcon icon={this.getIcon()} /> {this.props.children}</StatusAction>
        );
    }
}
