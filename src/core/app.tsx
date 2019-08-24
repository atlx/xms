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
import UserActions from "../actions/user";
import CategoryActions from "../actions/category";
import ChannelActions from "../actions/channel";
import AppStore from "../store/store";

export type PromiseOr<T = void> = Promise<T> | T;

export interface IDisposable {
	dispose(): any;
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

	private static gateway: Gateway;

	private static actions: GatewayActions;

	private static commandHandler: CommandHandler;

	private static net: NetworkHub;

	private static i18n: Localisation;

	private static devToolbox: DeveloperToolbox;

	private static notifications: boolean;

	private static renderer: AppRenderer;

	private static store: AppStore;

	public static init(renderer: AppRenderer): void {
		App.store = AppStore.createDefault();
		App.renderer = renderer;
		App.gateway = new Gateway(Constants.primaryGroupAddress, Constants.primaryBroadcastPort);
		App.actions = new GatewayActions(App.gateway);
		App.commandHandler = new CommandHandler();
		App.net = new NetworkHub(Constants.primaryNetPort);
		App.i18n = new Localisation();
		App.notifications = true;
		App.devToolbox = new DeveloperToolbox();

		// Register the local user in the state.
		UserActions.updateMe(App.me);

		// TODO: State is immutable, therefore once me is updated, it will not be reflected upon the users list?
		UserActions.add(App.me);

		CategoryActions.add({
			id: SpecialCategory.Connected,
			name: SpecialCategory.Connected,
			users: [App.me.id]
		});

		ChannelActions.setGeneralAsActive();
		App.render();
		App.gateway.connect();
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

	/**
	 * Create and render the root component.
	 */
	public static render(): void {
		console.log("[App] Rendering");

		if (document.getElementById("root") == null) {
			const root: any = document.createElement("div");

			root.id = "root";
			document.body.appendChild(root);
		}

		ReactDOM.render(App.renderer(), document.getElementById("root"));
	}

	public test(): void {
		//
	}

	public static getStore(): AppStore {
		return App.store;
	}
}
