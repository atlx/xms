import ReactDOM from "react-dom";
import Gateway from "../net/gateway";
import GatewayActions from "./gatewayActions";
import CommandHandler from "./commandHandler";
import NetworkHub from "./networkHub";
import Sounds from "./sounds";
import Constants from "./constants";
import Localisation from "./localisation";
import DeveloperToolbox from "./developerToolbox";
import Config from "./config";
import {remote} from "electron";
import {SpecialCategory} from "../models/misc";
import CategoryActions from "../actions/category";
import ChannelActions from "../actions/channel";
import AppStore from "../store/store";
import {User} from "../models/user";
import React from "react";
import ErrorPage from "../components/pages/error";

export type PromiseOr<T = void> = Promise<T> | T;

export interface IDisposable {
	dispose(): void;
}

export type Callback<T = void> = (...args: any[]) => T;

export type AppRenderer = () => JSX.Element;

export default class App {
	/**
	 * Whether the application is in development mode.
	 */
	public static devMode: boolean = process.env.NODE_ENV === "development";

	/**
	 * Save config and close application.
	 */
	public static close(): void {
		Config.save();
		remote.getCurrentWindow().close();
	}

	private static _gateway: Gateway;

	private static _actions: GatewayActions;

	private static commandHandler: CommandHandler;

	private static _net: NetworkHub;

	private static _i18n: Localisation;

	private static _developerToolbox: DeveloperToolbox;

	private static notifications: boolean;

	private static renderer: AppRenderer;

	private static _store: AppStore;

	public static boot(renderer: AppRenderer): void {
		try {
			App._store = AppStore.createDefault();
			App.renderer = renderer;

			App._gateway = new Gateway({
				port: Constants.primaryBroadcastPort,
				address: Constants.primaryGroupAddress,
				heartbeatInterval: 10_000
			});

			App._actions = new GatewayActions(App._gateway);
			App.commandHandler = new CommandHandler();
			App._net = new NetworkHub(Constants.primaryNetPort);
			App._i18n = new Localisation();
			App.notifications = true;
			App._developerToolbox = new DeveloperToolbox();

			// Register the local user in the state.
			// UserActions.updateMe(App.me);

			// TODO: State is immutable, therefore once me is updated, it will not be reflected upon the users list?
			// UserActions.add(App.me);

			CategoryActions.add({
				id: SpecialCategory.Connected,
				name: SpecialCategory.Connected,
				users: [/*App.me.id*/]
			});

			ChannelActions.setGeneralAsActive();
			App.render();
			App._gateway.connect();
		}
		catch (error) {
			App.render(() => (
				<ErrorPage
					message={error.message}
					fileName={error.fileName || "Unnamed"}
					lineNumber={error.lineNumber || "Unknown"}
				/>
			));

			console.log(error);

			throw error;
		}
	}

	public toggleNotifications(): this {
		App.notifications = !App.notifications;

		if (App.notifications) {
			App.notify();
		}

		return this;
	}

	/**
	 * Play the notification sound.
	 */
	public static notify(): void {
		if (!App.notifications) {
			return;
		}

		Sounds.notification();
	}

	public static openDevTools(): void {
		remote.getCurrentWebContents().openDevTools();
	}

	/**
	 * Create and render the root component.
	 */
	public static render(view: () => JSX.Element = App.renderer): void {
		console.log("[App] Rendering");

		if (document.getElementById("root") == null) {
			const root: any = document.createElement("div");

			root.id = "root";
			document.body.appendChild(root);
		}

		ReactDOM.render(view(), document.getElementById("root"));
	}

	public test(): void {
		//
	}

	public static get me(): User {
		return this._store.state.user.me;
	}

	public static get gateway(): Gateway {
		return App._gateway;
	}

	public static get store(): AppStore {
		return App._store;
	}

	public static get i18n(): Localisation {
		return App._i18n;
	}

	public static get dev(): DeveloperToolbox {
		return App._developerToolbox;
	}

	public static get actions(): GatewayActions {
		return App._actions;
	}
}
