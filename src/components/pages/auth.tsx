import React, {Component} from "react";
import Page from "./page";
import Passcode from "../passcode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import "@/styles/pages/auth.scss";

export default class AuthPage extends Component {
    public render(): JSX.Element {
        return (
            <Page pageId={PageId.Auth} className="auth-page" closeTooltip="Exit application">
                <FontAwesomeIcon className="lock" icon={faKey} />
                <div className="title">Enter passcode to continue</div>
                <Passcode />
            </Page>
        );
    }
}
