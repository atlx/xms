import React from "react";
import Application from "../components/application";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../store/store";
import BroadcastGateway from "../net/broadcastGateway";
import {User, Page, INotice, NoticeStyle, SpecialCategory, ContextMenuOptionType, SpecialChannel} from "../models/models";
import GatewayActions from "./gatewayActions";
import Actions from "../store/actions";
import CommandHandler from "./commandHandler";
import Factory from "./factory";
import {ICommand} from "./command";
import NetworkHub from "./networkHub";
import Sounds from "./sounds";
import Constants from "./constants";
import Localisation from "./localisation";
import DeveloperToolbox from "./developerToolbox";
import {HashRouter, Route} from "react-router-dom";
import Lost from "../components/lost";

export type PromiseOr<T = void> = Promise<T> | T;

export interface IDisposable {
	dispose(): any;
}

export type Callback<T = void> = (...args: any[]) => T;

export const DevelopmentMode: boolean = process.env.NODE_ENV === "development";

export const ValidMessagePattern: RegExp = /^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*$/i;

export default class App {
	public readonly gateway: BroadcastGateway;
	public readonly me: User;
	public readonly actions: GatewayActions;
	public readonly commandHandler: CommandHandler;
	public readonly net: NetworkHub;
	public readonly i18n: Localisation;
	public readonly dev: DeveloperToolbox;

	public notifications: boolean;

	public constructor(me: User) {
		this.gateway = new BroadcastGateway(Constants.primaryGroupAddress, Constants.primaryBroadcastPort);
		this.me = me;
		this.actions = new GatewayActions(this.gateway);
		this.commandHandler = new CommandHandler();
		this.net = new NetworkHub(Constants.primaryNetPort);
		this.i18n = new Localisation();
		this.notifications = true;
		this.dev = new DeveloperToolbox(this);
	}

	public toggleNotifications(): this {
		this.notifications = !this.notifications;

		if (this.notifications) {
			this.notify();
		}

		return this;
	}

	public notify(): this {
		if (!this.notifications) {
			return this;
		}

		Sounds.notification();

		return this;
	}

	public render(): void {
		console.log("[App] Rendering");

		if (document.getElementById("root") == null) {
			const root: any = document.createElement("div");

			root.id = "root";
			document.body.appendChild(root);
		}

		ReactDOM.render(
			<Provider store={store}>
				<HashRouter>
					{/* TODO: Hard-coded prop as null (required to pass in) */}
					<Route path="/index.html" exact render={() =>
						<Application modals={[] as any} page={Page.Init} />
					} />
					<Route component={Lost} />
				</HashRouter>
			</Provider>,

			document.getElementById("root")
		);
	}

	public registerCommands(): void {
		const commands: ICommand[] = [
			{
				name: "clear",
				description: "Clear all messages",

				handle(): void {
					Actions.clearMessages();
				}
			}
		];

		if (DevelopmentMode) {
			commands.push(...[
				{
					name: "notice",
					description: "Show a success notice",

					handle(): void {
						// TODO: Channel
						Actions.appendMessageToGeneral<INotice>(Factory.createNotice(SpecialChannel.General, "This is a success notice", NoticeStyle.Success));
					}
				},
				{
					name: "n-warn",
					description: "Show a warning notice",

					handle(): void {
						// TODO: Channel
						Actions.appendMessageToGeneral<INotice>(Factory.createNotice(SpecialChannel.General, "This is a warning notice", NoticeStyle.Warning));
					}
				},
				{
					name: "n-error",
					description: "Show an error notice",

					handle(): void {
						// TODO: Channel
						Actions.appendMessageToGeneral<INotice>(Factory.createNotice(SpecialChannel.General, "This is a error notice", NoticeStyle.Error));
					}
				},
				{
					name: "menu",
					description: "Display a context menu",

					handle(): void {
						Actions.showContextMenu({
							title: "Test context menu",

							position: {
								x: 50,
								y: 50
							},

							options: [
								{
									text: "Button",
									disabled: false,
									type: ContextMenuOptionType.Button,

									onClick(): void {
										alert("Context menu option click!");
									}
								}
							]
						});
					}
				}
			]);
		}

		Actions.registerCommands(commands);
	}

	public init(): void {
		if (DevelopmentMode) {
			this.test();
		}

		Actions.updateMe(this.me);

		// TODO: State is immutable, therefore once me is updated, it will not be reflected upon the users list?
		Actions.addUser(this.me);

		Actions.addCategory({
			id: SpecialCategory.Connected,
			name: SpecialCategory.Connected,
			users: [this.me.id]
		});

		Actions.setGeneralAsActiveChannel();
		this.registerCommands();
		this.render();
		this.gateway.connect();
	}

	public test(): void {
		//
	}
}
