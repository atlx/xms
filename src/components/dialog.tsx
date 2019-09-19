import React, {Component} from "react";
import "@styles/misc/dialog.scss";
import QuestionSVG from "@/resources/img/question.svg";
import SlimButton from "./slimButton";

type Props = {
    readonly className?: string;

    readonly text: string;

    readonly title: string;

    readonly options?: JSX.Element[];
};

export default class Dialog extends Component<Props> {
    public static defaultProps: Partial<Props> = {
        options: [
            <SlimButton text="Close" />,
            <SlimButton main text="Accept" />
        ]
    };

    public render(): JSX.Element {
        return (
            <div className="dialog">
                <img className="figure" src={QuestionSVG} />
                <div className="content">
                    <div className="title">{this.props.title}</div>
                    <div className="text">{this.props.text}</div>
                    <div className="options">
                        {this.props.options}
                    </div>
                </div>
            </div>
        );
    }
}
