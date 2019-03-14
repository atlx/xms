import React, {RefObject, CSSProperties} from "react";
import "../../styles/pages/init.scss";
import Loader from "../loader";
import Utils from "../../core/utils";
import Actions from "../../store/actions";
import {Page} from "../../models/models";
import {ConnectionState} from "../../store/store";

type InitPageState = {
	readonly progressVisible: boolean;
	readonly progressText: string;
	readonly steps: number;
	readonly maxSteps: number;
}

export default class InitPage extends React.Component<any, InitPageState> {
	private readonly $progress: RefObject<any>;

	private interfaceCheck: NodeJS.Timeout | null;

	public constructor(props: any) {
		super(props);

		this.interfaceCheck = null;

		// Bindings.
		this.setSteps = this.setSteps.bind(this);
		this.step = this.step.bind(this);
		this.incrementSteps = this.incrementSteps.bind(this);
		this.finish = this.finish.bind(this);
		this.getLoadingBarStyle = this.getLoadingBarStyle.bind(this);
		this.getProgressStyle = this.getProgressStyle.bind(this);

		// Refs.
		this.$progress = React.createRef();
	}

	public componentWillMount(): void {
		this.setState({
			progressVisible: false,
			steps: 0,
			progressText: "Connecting",

			// The total amount of steps that will be taken.
			maxSteps: 1
		});
	}

	public componentDidMount(): void {
		this.attemptInit();
	}

	public attemptInit(): void {
		this.setState({
			progressVisible: true,
			progressText: "Initializing"
		});

		if (!Utils.isNetworkAvailable()) {
			this.setState({
				progressText: "Waiting for a network interface"
			});

			this.interfaceCheck = setInterval(() => {
				if (Utils.isNetworkAvailable()) {
					if (this.interfaceCheck !== null) {
						clearInterval(this.interfaceCheck);
					}

					this.attemptInit();
				}
			}, 1000) as any;

			return;
		}

		Actions.setConnectionState(ConnectionState.Connecting);

		// TODO: Setup/do some stuff here, then increment steps, then finish.
		this.step();

		// Change the page with a delay for effect.
		setTimeout(() => Actions.setPage(Page.Default), 1000);
	}

	public finish(): void {
		Actions.setPage(Page.Default);
	}

	public setSteps(steps: number): void {
		const finalSteps: number = steps > this.state.maxSteps ? this.state.maxSteps : steps;

		this.setState({
			steps: finalSteps
		});

		if (finalSteps >= this.state.maxSteps) {
			setTimeout(this.finish, 1000);
		}
	}

	public step(): void {
		this.incrementSteps(1);
	}

	public incrementSteps(amount: number): void {
		this.setSteps(this.state.steps + amount);
	}

	public getLoadingBarStyle(): CSSProperties | undefined {
		if (!this.state.progressVisible) {
			return {
				display: "none"
			};
		}
	}

	public getProgressStyle(): CSSProperties {
		let percentage: number = Math.round(this.state.steps / this.state.maxSteps);

		if (this.state.steps === this.state.maxSteps) {
			percentage = 100;
		}

		return {
			width: percentage + "%"
		};
	}

	public render(): JSX.Element {
		return (
			<div className="init-page">
				<Loader size={3} text={this.state.progressText} />
				<div style={this.getLoadingBarStyle()} className="loading-bar">
					<div style={this.getProgressStyle()} ref={this.$progress} className="progress"></div>
				</div>
			</div>
		);
	}
}
