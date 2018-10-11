import React from "react";
import Application from "../components/application";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../store/store";
import BroadcastGateway from "../net/broadcast-gateway";
import {User} from "../types/types";
import GatewayActions from "./gateway-actions";

export default class App {
	public readonly gateway: BroadcastGateway;
	public readonly me: User;
	public readonly actions: GatewayActions;

	public constructor(me: User) {
		this.gateway = new BroadcastGateway("239.183.91.212", 45462);
		this.me = me;
		this.actions = new GatewayActions(this.gateway);
	}

	public render(): void {
		console.log("[App] Rendering");

		if (document.getElementById("root") == null) {
			const root = document.createElement("div");

			root.id = "root";
			document.body.appendChild(root);
		}

		ReactDOM.render(
			<Provider store={store}>
				<Application />
			</Provider>,

			document.getElementById("root")
		);
	}

	public init(): void {
		this.test();
		this.render();
		this.gateway.start();
	}

	public test(): void {
		//
	}
}
