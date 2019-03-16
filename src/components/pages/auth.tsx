import React, {Component} from "react";
import EmptyPage from "./empty";
import Passcode from "../passcode";
import "../../styles/pages/auth.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey} from "@fortawesome/free-solid-svg-icons";

export default class AuthPage extends Component {
    public render(): JSX.Element {
        return (
            <EmptyPage className="auth-page" closeTooltip="Exit application">
                <FontAwesomeIcon className="lock" icon={faKey} />
                <div className="title">Enter passcode to continue</div>
                <Passcode />
            </EmptyPage>
        );
    }
}
