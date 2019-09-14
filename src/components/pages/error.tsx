import {Component} from "react";
import "@/styles/pages/error.scss";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt, faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import Page from "./page";
import App from "@/core/app";
import PageId from "@/core/pageId";

type Props = {
    readonly message: string;

    readonly fileName: string;

    readonly lineNumber: number;
};

export default class ErrorPage extends Component<Props> {
    public render(): JSX.Element {
        return (
            <Page pageId={PageId.Error}>
                <div className="header">
                    <img className="image" src={require("@/resources/img/think.png")} />
                    <div className="title">Something's wrong</div>
                    <div className="sub-title">Might be missing a bolt or two</div>
                    <div className="message-wrap">
                        <div title="Open Chrome developer tools" onClick={() => App.openDevTools()} className="open-devtools">
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </div>
                        <span className="location"><span>{this.props.fileName}</span>:<span>{this.props.lineNumber}</span> &mdash; </span>
                        {this.props.message}
                    </div>
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
            </Page>
        );
    }
}
