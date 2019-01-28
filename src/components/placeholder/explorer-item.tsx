import React, {CSSProperties} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../styles/explorer-item.scss";
import "../../styles/placeholder/explorer-item.scss";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";
import Utils from "../../core/utils";
import Constants from "../../core/constants";

interface ILocalProps {
    readonly opacity: number;
}

export default class PlaceholderExplorerItem extends React.Component<ILocalProps> {
    public getStyle(): CSSProperties {
        return {
            opacity: 0.3 / this.props.opacity
        };
    }

    public render(): JSX.Element {
        return (
            <div style={this.getStyle()} className="explorer-item placeholder-explorer-item">
                <FontAwesomeIcon className="icon" icon={faHashtag} />
                <div style={Utils.getRandomPlaceholderStyle()} className="name" />
                <div className="indicator" />
            </div>
        );
    }
}
