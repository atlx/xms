import React, {CSSProperties} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "@/styles/explorer/explorerItem.scss";
import "@/styles/placeholder/explorerItem.scss";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";
import Util from "../../core/util";

type Props = {
    readonly opacity: number;
};

export default class PlaceholderExplorerItem extends React.Component<Props> {
    public getStyle(): CSSProperties {
        return {
            opacity: 0.3 / this.props.opacity
        };
    }

    public render(): JSX.Element {
        return (
            <div style={this.getStyle()} className="explorer-item placeholder-explorer-item">
                <FontAwesomeIcon className="icon" icon={faHashtag} />
                <div style={Util.getRandomPlaceholderStyle()} className="name" />
                <div className="indicator" />
            </div>
        );
    }
}
