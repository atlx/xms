import React from "react";
import "../styles/status-bar.scss";
import StatusAction from "./status-action";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWifi, faSignal} from "@fortawesome/free-solid-svg-icons";
import {IAppState, ConnectionState} from "../store/store";
import {connect} from "react-redux";

interface ILocalProps {
    readonly ping: number;
    readonly connectionState: ConnectionState;
}

class StatusBar extends React.Component<ILocalProps> {
    public renderPing(): string {
        if (this.props.ping < 1) {
            return "<1";
        }

        return this.props.ping.toString();
    }

    public renderConnectionState(): string {
        return ConnectionState[this.props.connectionState];
    }

    public render(): JSX.Element {
        return (
            <div className="status-bar">
                <div className="left">
                    <StatusAction>Hello world</StatusAction>
                </div>
                <div className="right">
                    <StatusAction tooltip="Connection latency"><FontAwesomeIcon icon={faSignal} /> {this.renderPing()}ms</StatusAction>
                    <StatusAction><FontAwesomeIcon icon={faWifi} /> {this.renderConnectionState()}</StatusAction>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): any => {
    return {
        ping: state.net.lastPing,
        connectionState: state.net.connectionState
    };
};

export default connect(mapStateToProps)(StatusBar);
