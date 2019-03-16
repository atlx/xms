import {Component} from "react";
import "../../styles/pages/error.scss";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import CloseButton from "../closeButton";
import Tooltip, {TooltipPosition} from "../tooltip";

export default class ErrorPage extends Component {
    public render(): JSX.Element {
        return (
            <div className="error-page">
                <Tooltip text="Close application" position={TooltipPosition.Left}>
                    <CloseButton />
                </Tooltip>
                <div className="header">
                    <img className="image" src={require("../../resources/img/think.png")} />
                    <div className="title">Something's not right</div>
                    <div className="sub-title">Might be missing a bolt or two</div>
                    <div
                        onClick={() => window.location.reload()}
                        className="reload">
                        <FontAwesomeIcon className="icon" icon={faSyncAlt} /> Reload Window
                    </div>
                </div>
                <div className="footer">
                    <div className="title">User ID</div>
                    <div className="id">2aae6c35c94fcfb415</div>
                </div>
            </div>
        );
    }
}
