import ReactDOM from "react-dom";
import Gateway from "@/net/gateway";
import NetworkHub from "@/net/networkHub";
import Constant from "./constant";
import Config from "./config";
import {remote} from "electron";
import {SpecialCategory} from "@/models/misc";
import CategoryActions from "../actions/category";
import ChannelAction from "../actions/channel";
import AppStore, {createInitialState, IAppState} from "../store/store";
import {User} from "@/models/user";
import React from "react";
import ErrorPage from "../components/pages/error";
import {AppRenderer} from "./helpers";

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

	public readonly gateway: Gateway;

	public readonly net: NetworkHub;

	public readonly store: AppStore;

	protected readonly renderer: AppRenderer;

	protected readonly initialState: IAppState;

	public constructor(store: AppStore, user: User, renderer: AppRenderer) {
		try {
			this.initialState = createInitialState(user);
			this.store = store;
			this.renderer = renderer;

			this.gateway = new Gateway({
				port: Constant.primaryBroadcastPort,
				address: Constant.primaryGroupAddress,
				heartbeatInterval: 10_000
			});

			this.net = new NetworkHub(Constant.primaryNetPort);

			// Register the local user in the state.
			// UserActions.updateMe(App.me);

			// TODO: State is immutable, therefore once me is updated, it will not be reflected upon the users list?
			// UserActions.add(App.me);

			CategoryActions.add({
				id: SpecialCategory.Connected,
				name: SpecialCategory.Connected,
				users: [/*App.me.id*/]
			});

			ChannelAction.setGeneralAsActive();
			this.render();
			this.gateway.connect();
		}
		catch (error) {
			this.render(() => (
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
	public render(view: () => JSX.Element = this.renderer): void {
		console.log("[App] Rendering");

		if (document.getElementById("root") == null) {
			const root: HTMLDivElement = document.createElement("div");

			root.id = "root";
			document.body.appendChild(root);
		}

		ReactDOM.render(view(), document.getElementById("root"));
	}

	public get me(): User {
		return this.store.state.user.me;
	}
}
