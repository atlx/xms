import React, {CSSProperties} from "react";
import "../styles/loader.scss";

type LoaderProps = {
    readonly text?: string | undefined;
    readonly size?: number;
}

export default class Loader extends React.Component<LoaderProps> {
    public constructor(props: LoaderProps) {
        super(props);

        // Bindings
        this.renderText = this.renderText.bind(this);
    }

    public renderText(): JSX.Element | undefined {
        if (this.props.text) {
            return <div style={this.getTextStyle()} className="text">{this.props.text}</div>;
        }
    }

    public getPropStyle(): CSSProperties {
        const size: string = (16 + (this.props.size || 0)) + "px";

        return {
            width: size,
            height: size
        };
    }

    public getTextStyle(): CSSProperties {
        return {
            fontSize: (13 + (this.props.size || 0)) + "px"
        };
    }

	public render(): JSX.Element {
		return (
			<div className="loader">
                <div style={this.getPropStyle()} className="prop"></div>
                {this.renderText()}
			</div>
		);
	}
}
