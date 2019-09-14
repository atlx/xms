import ReactDOM from "react-dom";
import Gateway from "../net/gateway";
import NetworkHub from "../net/networkHub";
import Constant from "./constant";
import Config from "./config";
import {remote} from "electron";
import {SpecialCategory} from "../models/misc";
import CategoryActions from "../actions/category";
import ChannelActions from "../actions/channel";
import AppStore, {createInitialState, IAppState} from "../store/store";
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

	public static get initialState(): IAppState {
		return App._initialState;
	}

	private static _initialState: IAppState;

	private static _gateway: Gateway;

	private static _net: NetworkHub;

	private static renderer: AppRenderer;

	private static _store: AppStore;

	public static boot(user: User, renderer: AppRenderer): void {
		try {
			App._initialState = createInitialState(user);
			App._store = AppStore.createDefault();
			App.renderer = renderer;

			App._gateway = new Gateway({
				port: Constant.primaryBroadcastPort,
				address: Constant.primaryGroupAddress,
				heartbeatInterval: 10_000
			});

			App._net = new NetworkHub(Constant.primaryNetPort);

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

	public static openDevTools(): void {
		remote.getCurrentWebContents().openDevTools();
	}

	/**
	 * Create and render the root component.
	 */
	public static render(view: () => JSX.Element = App.renderer): void {
		console.log("[App] Rendering");

		if (document.getElementById("root") == null) {
			const root: HTMLDivElement = document.createElement("div");

			root.id = "root";
			document.body.appendChild(root);
		}

		ReactDOM.render(view(), document.getElementById("root"));
	}

	public static get net(): NetworkHub {
		return App._net;
	}

	public static get store(): AppStore {
		return App._store;
	}
}
