import React from "react";
import "@styles/chat/autoCompleter.scss";
import {IGuideItem} from "@/models/misc";
import {CSSTransition} from "react-transition-group";
import MiscAction from "@/actions/misc";
import {connect} from "react-redux";
import {IAppState} from "@/store/store";

type Props = {
	readonly value: string;

	readonly visible: boolean;

	readonly items: IGuideItem[];

	readonly title: string;

	/**
	 * The callback to invoke once an item has been clicked.
	 */
	readonly onItemClick?: (item: IGuideItem) => void;

	/**
	 * Provided by Redux.
	 */
	readonly autoCompleteCommands?: IGuideItem[];
};

class ComposerGuide extends React.Component<Props> {
	public constructor(props: Props) {
		super(props);

		// Bindings
		this.handleItemClick = this.handleItemClick.bind(this);
	}

	protected handleItemClick(item: IGuideItem): void {
		if (this.props.onItemClick) {
			this.props.onItemClick(item);
		}
	}

	protected renderItems(): JSX.Element[] | JSX.Element {
		if (this.props.items.length === 0) {
			return (
				<div className="empty">No matching results</div>
			);
		}

		return this.props.items.map((item: IGuideItem, index: number) => {
			return <div onClick={() => this.handleItemClick(item)} key={item.id} tabIndex={index + 1} className="option">
				<div className="name">{item.name}</div>
				{item.subtext !== undefined &&
					<div className="subtext">{item.subtext}</div>
				}
			</div>;
		});
	}

	/**
	 * Change the visibility state.
	 */
	protected setVisible(visible: boolean): void {
		if (this.props.visible !== visible) {
			MiscAction.setGuideVisible(visible);
		}
	}

	/**
	 * Whether the command name is empty, with no characters.
	 */
	protected get isEmptyCommand(): boolean {
		// TODO: Debugging.
		console.log("command name", this.getCommandName(), `(${this.getCommandName().length})`);

		return this.getCommandName().length === 0;
	}

	protected filterAutoCompleteItems(): void {
		if (this.isEmptyCommand) {
			this.setState({
				filteredAutoCompleteCommands: this.props.autoCompleteCommands
			});

			return;
		}

		const command: string = this.getCommandName();

		this.setState({
			filteredAutoCompleteCommands: this.props.autoCompleteCommands!.filter((item: IGuideItem) =>
				item.name.toLowerCase().startsWith(command))
		});
	}

	/**
	 * Extract the command name from the current input value.
	 */
	protected getCommandName(): string {
		return this.props.value.substr(1).split(" ")[0].toLowerCase();
	}

	/**
	 * Whether the input is currently in command format.
	 */
	protected inCommand(): boolean {
		const value: string = this.props.value;

		return value.startsWith("/") && !value.includes(" ");
	}

	public handleChange(): void {
		if (!this.inCommand()) {
			this.setVisible(false);
		}
		else if (this.inCommand() && this.props.visible) {
			this.filterAutoCompleteItems();
		}
		else if (this.inCommand()) {
			this.filterAutoCompleteItems();
			this.setVisible(true);
		}
	}

	public render(): JSX.Element {
		return (
			<CSSTransition in={this.props.visible} classNames="trans" timeout={400}>
				<div className="auto-completer">
					<div className="title">{this.props.title}</div>
					{this.renderItems()}
				</div>
			</CSSTransition>
		);
	}
}

export default connect((state: IAppState): any => {
	return {
		autoCompleteCommands: state.category.commandHandler.getAllAsAutoCompleteCommands()
	};
})(ComposerGuide);
