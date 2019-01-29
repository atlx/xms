import React from "react";
import "../styles/status-bar.scss";
import StatusItem from "./status-item";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWifi, faSignal, faBell, faBellSlash} from "@fortawesome/free-solid-svg-icons";
import {IAppState, ConnectionState} from "../store/store";
import {connect} from "react-redux";
import {MainApp} from "..";
import StatusToggle from "./status-toggle";

interface ILocalProps {
    readonly ping: number;
    readonly connectionState: ConnectionState;
    readonly groupAddress?: string;
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
                    <StatusItem>Hello world</StatusItem>
                    <StatusItem>Loading</StatusItem>
                </div>
                <div className="right">
                    <StatusToggle onClick={() => MainApp.toggleNotifications()} on={faBell} off={faBellSlash}>Notifications</StatusToggle>
                    <StatusItem icon={faSignal} tooltip="Connection latency">{this.renderPing()}ms</StatusItem>
                    <StatusItem
                        icon={faWifi}
                        loading={this.props.connectionState === ConnectionState.Connecting}
                        tooltip={`Connected to ${MainApp.gateway.groupAddress}`}
                        onClick={() => MainApp.gateway.toggleConnected()}>{this.renderConnectionState()}</StatusItem>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): any => {
    return {
        ping: state.net.lastPing,
        connectionState: state.net.connectionState,
        groupAddress: state.net.groupAddress
    };
};

export default connect(mapStateToProps)(StatusBar);
