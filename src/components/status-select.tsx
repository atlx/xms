import React from "react";
import "../styles/status-bar/status-select.scss";
import StatusItem, {IStatusItemProps} from "./status-item";
import $ from "jquery";

interface ILocalProps extends IStatusItemProps {
    /**
     * The title that will be displayed on top of the options list.
     */
    readonly title?: string;

    /**
     * The text that will be displayed in the toggle button item.
     */
    readonly text: string;
}

interface ILocalState {
    /**
     * Whether the option list is visible.
     */
    readonly bodyVisible: boolean;
}

export default class StatusSelect extends React.Component<ILocalProps, ILocalState> {
    public readonly state: ILocalState = {
        bodyVisible: false
    };

    protected $statusSelect: React.RefObject<any>;

    public constructor(props: ILocalProps) {
        super(props);

        // Refs.
        this.$statusSelect = React.createRef();
    }

    public componentDidUpdate(): void {
        // Hide body when the user clicks elsewhere in the window.
        if (this.state.bodyVisible) {
            $(window).click((e) => {
                const rootEl: JQuery = $(this.$statusSelect.current);

                // Verify that the click was done outside of this component's root element.
                if (!rootEl.is(e.target as any) && rootEl.has(e.target as any).length === 0) {
                    this.setState({
                        bodyVisible: false
                    });
                }
            });
        }
    }

    public componentWillUnmount(): void {
        // TODO: Only remove the previously set click event (by this instance) with the purpose of closing on outside clicks.
        //$(window).off();
    }

    public toggleBody(): void {
        this.setState({
            bodyVisible: !this.state.bodyVisible
        });
    }

    public renderTitle(): JSX.Element | undefined {
        if (this.props.title !== undefined) {
            return <div className="title">{this.props.title}</div>;
        }
    }

    public render(): JSX.Element {
        return (
            <div ref={this.$statusSelect} className="status-select">
                {this.state.bodyVisible &&
                    <div className="select-body">
                        <div className="body-wrapper">
                            {this.renderTitle()}
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
