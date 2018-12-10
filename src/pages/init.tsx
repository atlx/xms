import React, {RefObject, CSSProperties} from "react";
import "../styles/pages/init.scss";
import Loader from "../components/loader";
import Actions from "../store/actions";
import {Page} from "../types/types";

export default class InitPage extends React.Component {
	private readonly $progress: RefObject<any>;

	private progress: number;
	private progressText: string;
	private showProgress: boolean;

	public constructor(props: any) {
		super(props);

		this.progress = 0;
		this.progressText = "Connecting";
		this.showProgress = true;

		// Refs
		this.$progress = React.createRef();
	}

	public componentDidMount(): void {
		// TODO: Debugging
		const stepBy: number = 10;
		const every: number = 1000;
		const endOffset: number = 1500;

		const fillup: any = setInterval(() => {
			this.incrementProgress(stepBy);
		}, every);

		setTimeout(() => {
			this.showProgress = false;
			this.progressText = "Initiating";
			this.forceUpdate();
		}, every * (100 / stepBy) + every);

		setTimeout(() => {
			clearInterval(fillup);
			Actions.setPage(Page.Default);
		}, (every * (100 / stepBy)) + every + endOffset);
	}

	public applyProgress(): void {
		this.setProgress(this.progress);
	}

	public setProgress(percentage: number): void {
		percentage = Math.round(percentage);

		this.$progress.current.style.width = percentage + "%";
	}

	public stepProgress(): void {
		this.incrementProgress(1);
	}

	public incrementProgress(amount: number): void {
		this.progress += amount;
		this.applyProgress();
	}

	public getProgressStyle(): CSSProperties | undefined {
		if (!this.showProgress) {
			return {
				display: "none"
			};
		}
	}

	public render(): JSX.Element {
		return (
			<div className="init-page">
				<Loader size={3} text={this.progressText} />
				<div style={this.getProgressStyle()} className="loading-bar">
					<div ref={this.$progress} className="progress"></div>
				</div>
			</div>
		);
	}
}
