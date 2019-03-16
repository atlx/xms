import React, {RefObject} from "react";
import "../../styles/chat/chat.scss";
import {connect} from "react-redux";
import {IAppState} from "../../store/store";
import {IMessage, IGenericMessage, MessageType, IChannel, IAutoCompleteItem, INotice, IBreakMessage} from "../../models/models";
import ChatMessage from "./chatMessage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHashtag, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Actions from "../../store/actions";
import {MainApp} from "../../index";
import NoticeMessage from "./noticeMessage";
import Loader from "../loader";
import {CSSTransition} from "react-transition-group";
import Autocompleter from "./autocompleter";
import CommandHandler from "../../core/commandHandler";
import Factory from "../../core/factory";
import {ValidMessagePattern} from "../../core/app";
import BreakMessage from "./breakMessage";

interface ILocalProps {
	readonly messages: IGenericMessage[];
	readonly activeChannel: IChannel;
	readonly inputLocked: boolean;
	readonly offsetMultiplier: number;
	readonly autoCompleteVisible: boolean;
	readonly commandHandler: CommandHandler;
	readonly autoCompleteCommands: IAutoCompleteItem[];
}

interface ILocalState {
	readonly offset: number;
	readonly filteredAutoCompleteCommands: IAutoCompleteItem[];
	readonly status: string | undefined;
	readonly shaking: boolean;
}

class Chat extends React.Component<ILocalProps, ILocalState> {
	private readonly $input: RefObject<HTMLInputElement>;
	private readonly $container: RefObject<any>;
	private readonly $loader: RefObject<any>;

	private shakeTimeout?: number;

	public constructor(props: ILocalProps) {
		super(props);

		// Bindings.
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.getCommandName = this.getCommandName.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.loadOlderMessages = this.loadOlderMessages.bind(this);
		this.getValue = this.getValue.bind(this);
		this.handleAutoCompleteItemClick = this.handleAutoCompleteItemClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		// Refs.
		this.$input = React.createRef();
		this.$container = React.createRef();
		this.$loader = React.createRef();
	}

	public componentWillMount(): void {
		// Initial state.
		this.setState({
			offset: 0,
			filteredAutoCompleteCommands: this.props.autoCompleteCommands,
			shaking: false
		});

		// TODO: Needs to reset once the component unmounts, use componentWillUnmount or componentDidUnmount for that.
		// Scroll messages when the escape key is pressed.
		window.onkeydown = (e: any) => {
			if (e.key === "Escape"
				&& (document.activeElement === document.body
					|| document.activeElement === this.$input.current)) {
				this.scrollMessages();
				this.focus();
			}
		};
	}

	public scrollMessages(): void {
		if (!this.isScrolled()) {
			this.$container.current.scrollTop = this.$container.current.scrollHeight;
		}
	}

	public isScrolled(): boolean {
		return this.$container.current.scrollTop >= this.$container.current.scrollHeight;
	}

	public componentDidUpdate(prevProps: ILocalProps, prevState: ILocalState): void {
		// Scroll messages when messages prop changes, and when status is shown/hidden
		// TODO: isScrolled() will not work on this position, since it has already been scrolled automatically.
		if (this.isScrolled() && prevProps.messages && this.props.messages.length !== prevProps.messages.length
			|| (prevState.status !== this.state.status && (!prevState.status || !this.state.status))) {
			this.scrollMessages();
		}

		// TODO: Possibly messing up stuff.
		//this.$messages.current.scrollTop = this.$messages.current.scrollHeight;

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

	public renderMessages(): JSX.Element[] {
		let messages: IGenericMessage[] = this.props.messages;

		//console.log(messages);

		// TODO: Debugging commented out.
		/* if (this.offset !== messages.length) {
			messages = messages.slice(-this.offset);
		} */

		//console.log(messages);

		// TODO: Hard-coded cut value.
		const cut: number = 100;

		if (messages.length >= cut) {
			messages = messages.slice(messages.length - cut, messages.length);
		}

		return messages.map((message: IGenericMessage) => {
			// Normal text message.
			if (message.type === MessageType.Text) {
				const textMessage: IMessage = message as IMessage;

				return <ChatMessage
					key={message.id}
					sent={textMessage.sent}
					authorName={textMessage.authorName}
					authorAvatarHash={textMessage.authorAvatarHash}
					content={message.text}
					time={textMessage.time}
					systemMessage={textMessage.systemMessage}
				/>;
			}
			// Notice message.
			else if (message.type === MessageType.Notice) {
				const notice: INotice = message as INotice;

				return <NoticeMessage
					key={message.id}
					style={notice.style}
					text={message.text}
				/>;
			}
			// Break message.
			else if (message.type === MessageType.Break) {
				const breakMessage: IBreakMessage = message as IBreakMessage;

				return <BreakMessage
					key={message.id}
					important={breakMessage.important}
					content={breakMessage.text}
				/>;
			}
			// Otherwise, the message type is invalid.
			else {
				throw new Error(`Unknown message type: ${message.type}`);
			}
		});
	}

	public getValue(trim: boolean = true): string {
		const value: string = this.$input.current!.value;

		return trim ? value.trim() : value;
	}

	public setValue(value: string): void {
		this.$input.current!.value = value;

		// OnChange event won't automatically trigger when manually setting the value.
		this.handleInputChange();
	}

	public focus(): void {
		this.$input.current!.focus();
	}

	public clearValue(): string {
		const value: string = this.getValue();

		this.setValue("");

		return value;
	}

	public appendValue(value: string): void {
		this.setValue(this.getValue() + value);
	}

	public getCommandName(): string {
		return this.getValue().substr(1).split(" ")[0].toLowerCase();
	}

	public inCommand(): boolean {
		const value: string = this.getValue(false);

		return value.startsWith("/") && !value.includes(" ");
	}

	public filterAutoCompleteItems(): void {
		if (this.isEmptyCommand()) {
			this.setState({
				filteredAutoCompleteCommands: this.props.autoCompleteCommands
			});

			return;
		}

		const command: string = this.getCommandName();

		this.setState({
			filteredAutoCompleteCommands: this.props.autoCompleteCommands.filter((item: IAutoCompleteItem) =>
				item.name.toLowerCase().startsWith(command))
		});
	}

	public shakeInput(): void {
		this.setState({
			shaking: true
		});
	}

	public handleKeyDown(e: any): void {
		// Prevent auto-pressing enter on other appearing components (such as modal open).
		if (e.key === "Enter") {
			e.preventDefault();
		}

		// Send a message.
		if (e.key === "Enter") {
			this.sendMessage();
		}
		else if (this.inCommand()) {
			// Filter values in auto complete.
		}

		// Change event won't trigger if value is manually cleared.
		//this.handleInputChange();

		// Update message length counter if applicable.
		const valueLength: number = this.$input.current!.value.length;

		if (valueLength > 0) {
			this.setState({
				status: `${this.$input.current!.maxLength - valueLength} characters left`
			});
		}
	}

	public sendMessage(): void {
		// Stop when there is no active channel.
		if (this.props.activeChannel.id === null) {
			return;
		}

		const value: string = this.getValue();

		// Stop if the input is invalid/disallowed. Shake the input element.
		if (!ValidMessagePattern.test(value)) {
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

		const message: IMessage = Factory.createMessage(this.props.activeChannel.id, value);

		this.clearValue();
		Actions.appendMessageToGeneral(message);
		MainApp.actions.handleMessage(message);
	}

	public handleScroll(): void {
		// TODO: Hard-coded threshold
		if (this.props.messages.length < 15) {
			return;
		}
		else if (this.$container.current.scrollTop === 0) {
			this.loadOlderMessages();
		}
	}

	public loadOlderMessages(): void {
		// TODO: Timeout for debugging (slower).
		setTimeout(() => {
			this.setState({
				offset: this.state.offset + 1
			});
		}, 1500);
	}

	public renderLoader(): JSX.Element | undefined {
		// TODO: Hard-coded threshold
		if (this.props.messages.length >= 15) {
			if (this.$container.current && this.$container.current.scrollTop === 0) {
				if (this.props.offsetMultiplier * this.state.offset > this.props.messages.length) {
					return <div className="beginning-of-history">Beginning of history</div>;
				}

				this.loadOlderMessages();
			}
			else {
				return <Loader ref={this.$loader} text="Loading messages" />
			}
		}
	}

	public handleAutoCompleteItemClick(item: IAutoCompleteItem): void {
		this.setValue(`/${item.name} `);

		// Focus input after appending data.
		this.focus();
	}

	public isEmptyValue(): boolean {
		return this.getValue().length === 0;
	}

	public isEmptyCommand(): boolean {
		console.log("command name", this.getCommandName(), `(${this.getCommandName().length})`);

		return this.getCommandName().length === 0;
	}

	public setAutoCompleteVisible(visible: boolean): void {
		if (this.props.autoCompleteVisible !== visible) {
			Actions.setAutoCompleteVisible(visible);
		}
	}

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
	}

	public getWrapperClass(): string {
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

	public render(): JSX.Element {
		return (
			<div className="chat">
				<div className="header">
					<div className="channel-title"><FontAwesomeIcon icon={faHashtag} /> {this.props.activeChannel.name}</div>
					<div className="channel-topic">{this.props.activeChannel.topic}</div>
				</div>
				<div ref={this.$container} onScroll={this.handleScroll} className="messages">
					{this.renderLoader()}
					{this.renderMessages()}
				</div>
				<div className="input">
					<Autocompleter
						onItemClick={this.handleAutoCompleteItemClick}
						title="Commands"
						visible={this.props.autoCompleteVisible}
						items={this.state.filteredAutoCompleteCommands}
					/>
					<CSSTransition in={this.props.inputLocked} classNames="trans" timeout={300}>
						<div className={this.getWrapperClass()}>
							<input
								onChange={this.handleInputChange}
								ref={this.$input}
								onKeyDown={this.handleKeyDown}
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
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState): any => {
	return {
		messages: state.message.messages,
		activeChannel: state.category.activeChannel,
		inputLocked: state.misc.inputLocked,
		autoCompleteVisible: state.misc.autoCompleteVisible,
		autoCompleteCommands: state.category.commandHandler.getAllAsAutoCompleteCommands(),
		commandHandler: state.category.commandHandler
	};
};

export default connect(mapStateToProps)(Chat);
