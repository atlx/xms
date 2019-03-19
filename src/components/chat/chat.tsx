import React, {RefObject} from "react";
import "../../styles/chat/chat.scss";
import {connect} from "react-redux";
import {IAppState} from "../../store/store";
import {User} from "../../models/user";
import ChatHeader from "./chatHeader";
import ChatContainer from "./chatContainer";
import {IChannel} from "../../models/channel";
import ChatComposer from "./chatComposer";
import {BasicMap} from "../../core/helpers";
import ChatFooter from "./chatFooter";
import {IGuideItem} from "../../models/misc";

interface IProps {
	readonly guideItems: IGuideItem[];
	readonly activeChannel: IChannel;
	readonly inputLocked: boolean;
	readonly users: BasicMap<User>;
}

interface IState {
	/**
	 * The current value of the input element.
	 * Initially an empty string.
	 */
	readonly value: string;
}

class Chat extends React.Component<IProps, IState> {
	private static readonly inputMaxLength: number = 100;

	private readonly $footer: RefObject<ChatFooter> = React.createRef();

	public state: IState = {
		value: ""
	};

	public componentWillMount(): void {
		// TODO: Needs to reset once the component unmounts, use componentWillUnmount or componentDidUnmount for that.
		// Scroll messages when the escape key is pressed.

		// TODO: Disabled because of error while separating components.
		// window.onkeydown = (e: any) => {
		// 	if (e.key === "Escape"
		// 		&& (document.activeElement === document.body
		// 			|| document.activeElement === this.$input.current)) {
		// 		this.scrollMessages();
		// 		this.focus();
		// 	}
		// };
	}

	protected handleInputChange(value: string): void {
		// Update the state's value.
		this.setState({
			value
		});

		this.$footer.current!.handleValueChange();
	}

	public render(): JSX.Element {
		return (
			<div className="chat">
				<ChatHeader activeChannel={this.props.activeChannel} />
				<ChatContainer messages={undefined as any} offsetMultiplier={1} />

				{/* TODO: Hard-coded empty values, replaced by redux. */}
				<ChatComposer
					users={this.props.users}
					activeChannel={this.props.activeChannel}
					locked={this.props.inputLocked}
					maxLength={Chat.inputMaxLength}
					guideVisible={undefined as any}
					guideItems={this.props.guideItems}
					useGuide={true}
				/>

				<ChatFooter maxLength={Chat.inputMaxLength} value={this.state.value} ref={this.$footer} />
			</div>
		);
	}
}
export default connect((state: IAppState): any => {
	return {
		guideItems: state.category.commandHandler.getAllAsAutoCompleteCommands(),
		activeChannel: state.category.activeChannel,
		inputLocked: state.misc.inputLocked,
		users: state.user.users
	};
})(Chat);
