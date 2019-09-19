import React, {CSSProperties} from "react";
import "@/styles/statusBar/statusSelect.scss";
import StatusItem from "./statusItem";
import $ from "jquery";
import {Callback} from "@/core/helpers";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type Props = {
    /**
     * The title that will be displayed on top of the options list.
     */
    readonly title?: string;

    /**
     * The text that will be displayed in the toggle button item.
     */
    readonly text: string;

    /**
     * The callback action to fired upon the toggle button being clicked.
     */
    readonly onClick?: Callback;

    /**
     * Whether the icon should be displayed as loading.
     */
    readonly loading?: boolean;

    /**
     * The icon of the toggle button.
     */
    readonly icon?: IconProp;

    /**
     * The style to be applied to the component.
     */
    readonly style?: CSSProperties;

    /**
     * The class name(s) that will be appended.
     */
    readonly className?: string;

    /**
     * Whether the item displays the notification indicator. Defaults to false.
     */
    readonly notify?: boolean;
};

type State = {
    /**
     * Whether the option list is visible.
     */
    readonly bodyVisible: boolean;
};

export default class StatusSelect extends React.Component<Props, State> {
    public static readonly defaultProps: Partial<Props> = {
        notify: false,
        loading: false
    };

    public readonly state: State = {
        bodyVisible: false
    };

    protected $statusSelect: React.RefObject<any>;

    public constructor(props: Props) {
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

    public getClass(): string {
        const classes: string[] = ["status-select"];

        if (this.props.className !== undefined) {
            classes.push(this.props.className);
        }

        return classes.join(" ");
    }

    public render(): JSX.Element {
        return (
            <div ref={this.$statusSelect} style={this.props.style} className={this.getClass()}>
                {this.state.bodyVisible &&
                    <div className="select-body">
                        {this.renderTitle()}
                        <div className="body-wrapper">
                            <div className="arrow" />
                            {this.props.children}
                        </div>
                    </div>
                }
                <StatusItem notify={this.props.notify} icon={this.props.icon} onClick={() => this.toggleBody()}>{this.props.text}</StatusItem>
            </div>
        );
    }
}
