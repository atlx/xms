import React, {Component, RefObject} from "react";
import ComposerGuide from "./composerGuide";
import {CSSTransition} from "react-transition-group";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {IGuideItem} from "../../models/misc";
import {connect} from "react-redux";
import {IAppState} from "../../store/store";
import Pattern from "../../core/pattern";
import {List} from "immutable";
import {User} from "../../models/user";
import {IMessage} from "../../models/message";
import Factory from "../../core/factory";
import Actions from "../../store/actions";
import {MainApp} from "../..";

interface IProps {
    readonly autoCompleteVisible: boolean;
}

interface ILocalState {
    readonly filteredAutoCompleteCommands: IGuideItem[];
    readonly status: string | undefined;

    /**
     * Whether the input element is currently shaking.
     */
    readonly shaking: boolean;

    /**
	 * The number of lines present in the input textarea. Defaults to 1.
	 */
	readonly inputLines: number;
}

class ChatComposer extends Component<IProps, ILocalState> {
    public state: ILocalState = {
        filteredAutoCompleteCommands: this.props.autoCompleteCommands,
        shaking: false,
        inputLines: 1,
        status: undefined
    };

    private readonly $input: RefObject<HTMLTextAreaElement> = React.createRef();

    public handleInputChange(): void {
		if (!this.inCommand()) {
			this.setAutoCompleteVisible(false);
		}
		else if (this.inCommand() && this.props.autoCompleteVisible) {
			this.filterAutoCompleteItems();
		}
		else if (this.inCommand()) {
			this.filterAutoCompleteItems();
			this.setAutoCompleteVisible(true);
		}

		// Create length variables for conviniency.
		const valueLength: number = this.$input.current!.value.length;
		const maxLength: number = this.$input.current!.maxLength;
		const threshold: number = Math.round(maxLength / 5);

		// Update character counter if threshold is met, and is not at max length.
		if (valueLength > threshold && valueLength <= maxLength) {
			this.setState({
				status: `${maxLength - valueLength} characters left`
			});
		}
		// Length does not exceed threshold, hide counter.
		else {
			this.setState({
				status: undefined
			});
		}
	}

    protected setInputLines(lines: number): void {
		$(this.$input.current!).height((lines * 22) + "px");
	}

	protected getWrapperClass(): string {
		const classes: string[] = ["message-wrapper"];

		if (this.props.inputLocked) {
			classes.push("disabled");
		}

		// Add the shaking animation class.
		if (this.state.shaking) {
			classes.push("shaking");
		}

		return classes.join(" ");
	}

	protected setValue(value: string): void {
		this.$input.current!.value = value;

		// OnChange event won't automatically trigger when manually setting the value.
		this.handleInputChange();
	}

	public focus(): void {
		this.$input.current!.focus();
	}

	/**
	 * Retrieve and clear the input value.
	 */
	protected clearValue(): string {
		const value: string = this.getValue();

		this.setValue("");

		return value;
	}

	/**
	 * Append text to the input's value.
	 */
	protected appendValue(value: string): void {
		this.setValue(this.getValue() + value);
	}

    protected handleAutoCompleteItemClick(item: IGuideItem): void {
		this.setValue(`/${item.name} `);

		// Focus input after appending data.
        this.focus();
    }

    protected shakeInput(): void {
		this.setState({
			shaking: true
		});
	}

    protected handleKeyDown(e: any): void {
		// Prevent auto-pressing enter on other appearing components (such as modal open).
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
		}

		// Expand the input.
		if (e.key === "Enter" && e.shiftKey) {
			this.setState({
				inputLines: this.state.inputLines + 1
			});
		}
		// Send a message.
		else if (e.key === "Enter") {
			this.sendMessage();
		}
		else if (this.inCommand()) {
			// TODO: Filter values in auto complete.
		}

		// Change event won't trigger if value is manually cleared.
		//this.handleInputChange();

		// Create length variables for conviniency.
		const valueLength: number = this.$input.current!.value.length;
		const maxLength: number = this.$input.current!.maxLength;

		// TODO: Prevent triggering on "non-value" keys (such as CTRL/SHIFT/ARROWS).
		// Max input length reached. Shake input for feedback.
		if (valueLength === maxLength) {
			this.shakeInput();
		}
    }
    
    protected isEmptyValue(): boolean {
		return this.getValue().length === 0;
    }
    
    protected sendMessage(): void {
		// Stop when there is no active channel.
		if (this.props.activeChannel.id === null) {
			return;
		}

		let value: string = this.getValue();

		// Stop if the input is invalid/disallowed. Shake the input element.
		if (!Pattern.message.test(value)) {
			this.shakeInput();

			return;
		}

		// Avoid sending empty messages.
		if (value === "") {
			return;
		}
		// Handle command messages internally.
		else if (value.startsWith("/")) {
			// TODO: Pass in arguments.
			this.props.commandHandler.handle(this.getCommandName());
			this.clearValue();

			return;
		}
		// Otherwise, attempt to handle partial mentions if applicable.
		else {
			while (Pattern.partialMention.test(value)) {
				// Convert each match to absolute mention, if user(s) exist.
				for (const match of Pattern.partialMention.exec(value)!) {
					const name: string = match.substring(1);

					const users: List<User> = this.props.users.filter((user: User) => {
						return user.username === name;
					}).toList();

					// TODO: Need to choose between multiple possible matches.
					if (users.size > 0) {
						value = value.replace(match, `<@:${users.get(0)!.id}>`);
					}
					// No user found.
					else {
						value = value.replace(match, `<@:${name}>`);
					}
				}
			}
		}

		const message: IMessage = Factory.createMessage(this.props.activeChannel.id, value);

		this.clearValue();
		Actions.appendMessageToGeneral(message);
		MainApp.actions.handleMessage(message);
	}

	public getValue(trim: boolean = true): string {
		const value: string = this.$input.current!.value;

		return trim ? value : value.trim();
	}
    
    public render(): JSX.Element {
        return (
            <div className="input">
                <ComposerGuide
                    onItemClick={this.handleAutoCompleteItemClick}
                    title="Commands"
                    visible={this.props.autoCompleteVisible}
					items={this.state.filteredAutoCompleteCommands}
					getValue={this.getValue}
                />
                <CSSTransition in={this.props.inputLocked} classNames="trans" timeout={300}>
                    <div className={this.getWrapperClass()}>
                        <textarea
                            rows={this.state.inputLines}
                            onChange={this.handleInputChange}
                            ref={this.$input}
                            onKeyDown={(e) => this.handleKeyDown(e)}
                            placeholder="Type a message"
                            className="message"
                            disabled={this.props.inputLocked}
                            maxLength={300}
                        />
                        <div onClick={() => this.sendMessage()} className="send"><FontAwesomeIcon icon={faArrowRight} /></div>
                    </div>
                </CSSTransition>
                <div className="extra">
                    <div className="typing"></div>
                    <div className="status">{this.state.status}</div>
                </div>
            </div>
        );
    }
}

export default connect((state: IAppState): any => {
    return {
		autoCompleteVisible: state.misc.autoCompleteVisible
	};
})(ChatComposer);
