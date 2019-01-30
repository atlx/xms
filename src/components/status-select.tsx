import React from "react";
import "../styles/status-select.scss";
import StatusItem, {IStatusItemProps} from "./status-item";

interface ILocalProps extends IStatusItemProps {
    readonly text: string;
}

interface ILocalState {
    readonly bodyVisible: boolean;
}

export default class StatusSelect extends React.Component<ILocalProps, ILocalState> {
    public readonly state: ILocalState = {
        bodyVisible: false
    };

    public toggleBody(): void {
        this.setState({
            bodyVisible: !this.state.bodyVisible
        });
    }

    public render(): JSX.Element {
        return (
            <div className="status-select">
                {this.state.bodyVisible &&
                    <div className="select-body">
                        <div className="body-wrapper">
                            {this.props.children}
                            <div className="arrow" />
                        </div>
                    </div>
                }
                <StatusItem {...this.props} onClick={() => this.toggleBody()}>{this.props.text}</StatusItem>
            </div>
        );
    }
}
