import React from "react";
import "../../styles/chat/autoCompleter.scss";
import {IGuideItem} from "../../models/misc";
import {CSSTransition} from "react-transition-group";
import Actions from "../../store/actions";

interface ILocalProps {
	readonly getValue: (trim?: boolean) => string;
	readonly visible: boolean;
	readonly items: IGuideItem[];
	readonly title: string;
	readonly onItemClick?: (item: IGuideItem) => void;
}

export default class ComposerGuide extends React.Component<ILocalProps> {
	public constructor(props: ILocalProps) {
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

	protected setGuideVisible(visible: boolean): void {
		if (this.props.autoCompleteVisible !== visible) {
			Actions.setAutoCompleteVisible(visible);
		}
	}

	protected isEmptyCommand(): boolean {
		// TODO: Debugging.
		console.log("command name", this.getCommandName(), `(${this.getCommandName().length})`);

		return this.getCommandName().length === 0;
	}

	protected filterAutoCompleteItems(): void {
		if (this.isEmptyCommand()) {
			this.setState({
				filteredAutoCompleteCommands: this.props.autoCompleteCommands
			});

			return;
		}

		const command: string = this.getCommandName();

		this.setState({
			filteredAutoCompleteCommands: this.props.autoCompleteCommands.filter((item: IGuideItem) =>
				item.name.toLowerCase().startsWith(command))
		});
	}

	protected getCommandName(): string {
		return this.props.getValue().substr(1).split(" ")[0].toLowerCase();
	}

	protected inCommand(): boolean {
		const value: string = this.props.getValue(false);

		return value.startsWith("/") && !value.includes(" ");
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
