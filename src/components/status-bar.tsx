import React from "react";
import "../styles/status-bar.scss";
import StatusAction from "./status-action";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWifi, faSignal} from "@fortawesome/free-solid-svg-icons";
import {IAppState} from "../store/store";
import {connect} from "react-redux";

class StatusBar extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="status-bar">
                <div className="left">
                    <StatusAction>Hello world</StatusAction>
                </div>
                <div className="right">
                    <StatusAction><FontAwesomeIcon icon={faSignal} /> {32ms}</StatusAction>
                    <StatusAction><FontAwesomeIcon icon={faWifi} /> Connected</StatusAction>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): any => {
    return {
        messages: state.message.messages,
        activeChannel: state.category.activeChannel,
        inputLocked: state.misc.inputLocked,
        autoCompleteVisible: state.misc.autoCompleteVisible,
        autoCompleteCommands: state.category.commandHandler.getAllAsAutoCompleteCommands(),
        commandHandler: state.category.commandHandler
    };
};

export default connect(mapStateToProps)(StatusBar);
