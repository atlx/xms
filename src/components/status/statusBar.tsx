import React from "react";
import "@styles/statusBar/statusBar.scss";
import StatusItem from "../status/statusItem";
import {faWifi, faSignal, faBell, faGlobeAmericas, faBullseye, faArrowUp, faArrowDown, faToolbox, faComment, faLocationArrow, faTimesCircle, faBookOpen, faUserCircle, faArrowRight, faGripLines} from "@/fortawesome/free-solid-svg-icons";
import {IAppState, ConnectionState} from "@/store/store";
import {connect} from "react-redux";
import StatusSelect from "../status/statusSelect";
import StatusSelectItem from "./statusSelectItem";
import MiscAction from "@/actions/misc";
import App from "@/core/app";
import ModalAction from "@/actions/modal";
import MessageAction from "@/actions/message";
import {app} from "@/index";

type Props = {
    readonly ping: number;

    readonly connectionState: ConnectionState;

    readonly groupAddress?: string;

    readonly leftPanelVisible?: boolean;
};

class StatusBar extends React.Component<Props> {
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
                    {!this.props.leftPanelVisible &&
                        <StatusItem onClick={() => MiscAction.setLeftPanelVisible(true)} icon={faArrowRight}>Show explorer</StatusItem>
                    }
                    <StatusItem tooltip="Upload meter" icon={faArrowUp}>12 KB</StatusItem>
                    <StatusItem tooltip="Download meter" icon={faArrowDown}>53 KB</StatusItem>
                </div>
                <div className="right">
                    {App.devMode &&
                        <StatusSelect notify icon={faToolbox} text="Developer Tools" title="Select Action">
                            <StatusItem onClick={() => App.dev.emulatePublicMessage()} icon={faComment}>General message</StatusItem>
                            <StatusItem icon={faLocationArrow}>Direct message</StatusItem>
                            <StatusItem onClick={() => App.dev.emulateBreakMessage()} icon={faGripLines}>Break Message</StatusItem>
                            <StatusItem icon={faBookOpen} onClick={() => ModalAction.show({
                                title: "This is a modal",
                                text: "Requested by user"
                            })}>Show a modal</StatusItem>
                            <StatusItem icon={faBell} onClick={() => App.notify()}>Notify</StatusItem>
                            <StatusItem icon={faTimesCircle} onClick={() => MessageAction.clear()}>Clear messages</StatusItem>
                            <StatusItem icon={faUserCircle} onClick={() => App.dev.addDummyUser()}>Dummy user</StatusItem>
                        </StatusSelect>
                    }
                    <StatusSelect icon={faBullseye} text="State" title="Select State">
                        {/* TODO: States */}
                        <StatusSelectItem selected>Online</StatusSelectItem>
                        <StatusSelectItem disabled>Busy</StatusSelectItem>
                        <StatusSelectItem disabled>Away</StatusSelectItem>
                        <StatusSelectItem disabled>Offline</StatusSelectItem>
                    </StatusSelect>
                    <StatusSelect icon={faGlobeAmericas} text={app.i18n.activeLanguage} title="Select Language">
                        {/* TODO: Languages */}
                        <StatusSelectItem selected>{Language.English}</StatusSelectItem>
                        <StatusSelectItem disabled>{Language.Spanish}</StatusSelectItem>
                        <StatusSelectItem disabled>{Language.MandarinChinese}</StatusSelectItem>
                        <StatusSelectItem disabled>{Language.Russian}</StatusSelectItem>
                    </StatusSelect>
                    <StatusItem icon={faSignal} tooltip="Connection latency">{this.renderPing()}ms</StatusItem>
                    <StatusItem
                        icon={faWifi}
                        loading={this.props.connectionState === ConnectionState.Connecting}
                        tooltip={`Connected to ${app.gateway.options.address}`}
                        onClick={() => app.gateway.toggleConnected()}>{this.renderConnectionState()}</StatusItem>
                </div>
            </div>
        );
    }
}

export default connect((state: IAppState): any => {
    return {
        ping: state.net.lastPing,
        connectionState: state.net.connectionState,
        groupAddress: state.net.groupAddress,
        leftPanelVisible: state.misc.leftPanelVisible
    };
})(StatusBar);
