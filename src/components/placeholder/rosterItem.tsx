import React, {CSSProperties} from "react";
import "../../styles/roster/rosterItem.scss";
import "../../styles/placeholder/rosterItem.scss";
import Util from "../../core/util";

interface IProps {
    readonly opacity: number;
}

export default class PlaceholderRosterItem extends React.Component<IProps> {
    public static readonly widthFrom: number = 90;
    public static readonly widthTo: number = 140;

    public getStyle(): CSSProperties {
        return {
            opacity: 0.3 / this.props.opacity
        };
    }

    public render(): JSX.Element {
        return (
            <div style={this.getStyle()} className="roster-item placeholder-roster-item">
                {/* TODO: Temp. unknown avatar image */}
                <div className="avatar" />
                <div className="info-wrapper">
                    <div style={Util.getRandomPlaceholderStyle()} className="name" />
                    <div className="status" />
                </div>
            </div>
        );
    }
}
