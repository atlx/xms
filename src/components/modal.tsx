import React, {RefObject} from "react";
import "../styles/modal.scss";
import {CSSTransition} from "react-transition-group";

type ModalProps = {
    readonly title: string;
    readonly text: string;
    readonly onClose?: () => void;
}

type ModalState = {
    readonly visible: boolean;
}

export default class Modal extends React.Component<ModalProps, ModalState> {
    private $okay: RefObject<any>;

    public constructor(props: ModalProps) {
        super(props);

        // Bindings
        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleOnExited = this.handleOnExited.bind(this);

        // Refs
        this.$okay = React.createRef();
    }

    public componentWillMount(): void {
        this.setState({
            visible: true
        });
    }

    public componentDidMount(): void {
        this.$okay.current.focus();
    }

    public handleOnClose(): void {
        this.setState({
            visible: false
        });
    }

    public handleOnExited(): void {
        if (this.props.onClose !== undefined) {
            this.props.onClose();
        }
    }

    public render(): JSX.Element {
        return (
            <CSSTransition in={this.state.visible} classNames="trans" timeout={300} onExited={this.handleOnExited}>
                <div className="modal-container">
                    <div onDoubleClick={this.handleOnClose} className="overlay"></div>
                    <div className="modal">
                        <div className="header">
                            <div className="title">{this.props.title}</div>
                        </div>
                        <div className="content">
                            {this.props.text}
                        </div>
                        <div className="options">
                            <button ref={this.$okay} onClick={this.handleOnClose} tabIndex={1} className="close">Okay</button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        );
    }
}