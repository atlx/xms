import React from "react";
import "../styles/modal.scss";

type ModalProps = {
    readonly title: string;
    readonly text: string;
    readonly onClose?: () => void;
}

export default class Modal extends React.Component<ModalProps> {
    public constructor(props: ModalProps) {
        super(props);

        // Bindings
        this.handleOnClose = this.handleOnClose.bind(this);
    }

    public handleOnClose(): void {
        if (this.props.onClose !== undefined) {
            this.props.onClose();
        }
    }

    public render(): JSX.Element {
        return (
            <div className="modal-container">
                <div className="overlay"></div>
                <div className="modal">
                    <div className="header">
                        <div className="title">{this.props.title}</div>
                    </div>
                    <div className="content">
                        {this.props.text}
                    </div>
                    <div className="options">
                        <button onClick={this.handleOnClose} className="close">Okay</button>
                    </div>
                </div>
            </div>
        );
    }
}
