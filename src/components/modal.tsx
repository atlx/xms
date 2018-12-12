import React from "react";
import "../styles/modal.scss";

type ModalProps = {
    readonly title: string;
    readonly text: string;
}

export default class Modal extends React.Component<ModalProps> {
    public constructor(props: ModalProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div className="overlay"></div>
                <div className="modal">
                    <div className="header">
                        <div className="title">{this.props.title}</div>
                    </div>
                    <div className="content">
                        {this.props.text}
                    </div>
                    <div className="options">
                        <button className="close">Okay</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
