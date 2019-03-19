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
import {ITextMessage} from "../../models/message";
import Factory from "../../core/factory";
import {MainApp} from "../..";
import "../../styles/chat/chatComposer.scss";
import MessageActions from "../../actions/message";
import {IChannel} from "../../models/channel";
import {BasicMap} from "../../core/helpers";

interface IProps {
	readonly users: BasicMap<User>;

	/**
	 * The items that the guide will display.
	 */
	readonly guideItems?: IGuideItem[];

	/**
	 * Whether this composer allows the use of a guide.
	 * Defaults to false.
	 */
	readonly useGuide?: boolean;

	/**
	 * The focused channel that the user is currently browsing.
	 */
	readonly activeChannel: IChannel;

	/**
	 * Callback to invoke upon value being changed.
	 */
	readonly onChange: (value: string) => void;

	/**
	 * The max value length. Defaults to 100.
	 */
	readonly maxLength?: number;

	/**
	 * Provided by Redux. Whether the composer's guide is visible.
	 */
	readonly guideVisible: boolean;

	/**
	 * Whether the input is locked and not allowing data change. Defaults to false.
	 */
	readonly locked?: boolean;
}

interface IState {
	readonly filteredAutoCompleteCommands: IGuideItem[];

	/**
	 * The current value in the input element.
	 */
	readonly value: string;

    /**
     * Whether the input element is currently shaking.
     */
	readonly shaking: boolean;

    /**
	 * The number of lines present in the input textarea. Defaults to 1.
	 */
	readonly inputLines: number;
}

class ChatComposer extends Component<IProps, IState> {
	public static defaultProps: Partial<IProps> = {
		maxLength: 100,
		locked: false,
		useGuide: false
	};

	public state: IState = {
		filteredAutoCompleteCommands: this.props.guideItems || [],
		shaking: false,
		inputLines: 1,
		value: ""
	};

	private readonly $input: RefObject<HTMLTextAreaElement> = React.createRef();
	private readonly $guide: RefObject<any> = React.createRef();

	private shakeTimeout?: number;

	public componentDidUpdate() {
		// TODO: componentDidUpdate() may trigger in unwanted situations, such as on receive message.
		//this.focus();

		// Set the pending done timeout if it is not already set. Override if already exists.
		if (this.state.shaking) {
			clearTimeout(this.shakeTimeout);

			// TODO: Timeout is bound to CSS time value.
			(this.shakeTimeout as any) = setTimeout(() => {
				this.setState({
					shaking: false
				})
			}, 90);
		}
	}

	public componentWillUnmount(): void {
		// Clear shake timeout once the component unmounts to prevent leaving garbage behind.
		clearTimeout(this.shakeTimeout as any);
	}

	protected setInputLines(lines: number): void {
		// TODO: Might not need with textarea's 'row' attribute.
		$(this.$input.current!).height((lines * 22) + "px");
	}

	protected getWrapperClass(): string {
		const classes: string[] = ["message-wrapper"];

		if (this.props.locked) {
			classes.push("disabled");
		}

		// Add the shaking animation class.
		if (this.state.shaking) {
			classes.push("shaking");
		}

		return classes.join(" ");
	}

	/**
	 * Set the input element's value.
	 */
	protected setValue(value: string): void {
		this.$input.current!.value = value;

		// The OnChange event won't automatically trigger when manually setting the value.
		this.handleChange();
	}

	/**
	 * Set the window's focus to the input element.
	 */
	protected focus(): void {
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

	/**
	 * Play the shake animation on the input element.
	 */
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
		else if (this.$guide.current!.inCommand()) {
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
			MainApp.commandHandler.handle(this.$guide.current!.getCommandName());
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

		const message: ITextMessage = Factory.createMessage(this.props.activeChannel.id, value);

		this.clearValue();
		MessageActions.addToGeneral(message);
		MainApp.actions.handleMessage(message);
	}

	public getValue(trim: boolean = false): string {
		const value: string = this.$input.current!.value;

		return trim ? value : value.trim();
	}

	protected handleChange(): void {
		// Update the state's value.
		this.setState({
			value: this.getValue()
		});

		// Invoke the prop listener.
		this.props.onChange(this.getValue());
	}

	public render(): JSX.Element {
		return (
			<div className="chat-composer">
				<ComposerGuide
					ref={this.$guide}
					onItemClick={this.handleAutoCompleteItemClick}
					title="Commands"
					visible={this.props.guideVisible}
					items={this.state.filteredAutoCompleteCommands}
					value={this.state.value}
				/>
				<CSSTransition in={this.props.locked} classNames="trans" timeout={300}>
					<div className={this.getWrapperClass()}>
						<textarea
							rows={this.state.inputLines}
							onChange={() => this.handleChange}
							ref={this.$input}
							onKeyDown={(e) => this.handleKeyDown(e)}
							placeholder="Type a message"
							className="input"
							disabled={this.props.locked}
							maxLength={this.props.maxLength}
						/>
						<div onClick={() => this.sendMessage()} className="send">
							<FontAwesomeIcon icon={faArrowRight} />
						</div>
					</div>
				</CSSTransition>
			</div>
		);
	}
}

export default connect((state: IAppState): any => {
	return {
		autoCompleteVisible: state.misc.guideVisible
	};
})(ChatComposer);
