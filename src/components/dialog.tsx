import React, {Component} from "react";
import "../styles/misc/dialog.scss";
import QuestionSVG from "../resources/img/question.svg";
import Button from "./slimButton";

interface IProps {
    readonly className?: string;

    readonly text: string;

    readonly title: string;
}

export default class Dialog extends Component<IProps> {
    public render(): JSX.Element {
        return (
            <div className="dialog">
                <img className="figure" src={QuestionSVG} />
                <div className="content">
                    <div className="title">{this.props.title}</div>
                    <div className="text">{this.props.text}</div>
                    <div className="options">
                        <Button text="Decline" />
                        <Button main text="Accept" />
                    </div>
                </div>
            </div>
        );
    }
}
