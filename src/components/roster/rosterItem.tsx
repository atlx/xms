import React from "react";
import "../../styles/roster/rosterItem.scss";
import Tooltip, {TooltipPosition} from "../tooltip";

interface IProps {
    readonly name: string;
    readonly avatarUrl?: string;
    readonly status?: string;
    readonly me?: boolean;
}

export default class RosterItem extends React.Component<IProps> {
    public getComponentStyle(): string {
        const classes: string[] = ["roster-item"];

        // TODO: Check here if item is local user (import store, etc)
        if (this.props.me) {
            classes.push("me");
        }

        return classes.join(" ");
    }

    public renderContent(): JSX.Element {
        return (
            <div className={this.getComponentStyle()}>
                {/* TODO: Temp. unknown avatar image */}
                <img className="avatar" src={this.props.avatarUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Antu_face-sad.svg/1024px-Antu_face-sad.svg.png"} />
                <div className="info-wrapper">
                    <div className="name">{this.props.name}</div>
                    <div className="status">{this.props.status}</div>
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        if (!this.props.me) {
            return this.renderContent();
        }
        else {
            return (
                <Tooltip position={TooltipPosition.Left} style={{
                    display: "block",

                    // TODO: Should be :not(:last-child).
                    marginBottom: "5px"
                }} text="That's you!">
                    {this.renderContent()}
                </Tooltip>
            );
        }
    }
}
