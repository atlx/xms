import React, {CSSProperties} from "react";
import "../../styles/roster-item.scss";
import "../../styles/placeholder/roster-item.scss";
import Utils from "../../core/utils";

interface ILocalProps {
    readonly opacity: number;
}

export default class PlaceholderRosterItem extends React.Component<ILocalProps> {
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
                    <div style={Utils.getRandomPlaceholderStyle()} className="name" />
                    <div className="status" />
                </div>
            </div>
        );
    }
}
