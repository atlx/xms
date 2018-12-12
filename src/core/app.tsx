import React from "react";
import Application from "../components/application";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../store/store";
import BroadcastGateway from "../net/broadcast-gateway";
import {User, Page, INotice} from "../types/types";
import GatewayActions from "./gateway-actions";
import Actions from "../store/actions";
import CommandHandler from "./command-handler";
import Utils from "./utils";
import Factory from "./factory";

// TODO: Expression-import not working for some reason
// require(Paths.resource("notify", ResourceGroup.Sounds, CommonExtensions.MP3))

// Works, returns bundled path
const f = require("../resources/sounds/notify.mp3");

export default class App {
	private static notificationSound = new Audio(f);

	public static notify(): void {
		App.notificationSound.load();
		App.notificationSound.play();
	}

	public readonly gateway: BroadcastGateway;
	public readonly me: User;
	public readonly actions: GatewayActions;
	public readonly commandHandler: CommandHandler;

	public constructor(me: User) {
		this.gateway = new BroadcastGateway("233.183.91.212", 45462);
		this.me = me;
		this.actions = new GatewayActions(this.gateway);
		this.commandHandler = new CommandHandler();
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
				<Application page={Page.Init} />
			</Provider>,

			document.getElementById("root")
		);
	}

	public registerCommands(): void {
		Actions.registerCommands([
			{
				name: "ping",
				description: "View the connection's latency",

				handle(): void {
					const ping: number = -1;

					Actions.addMessage<INotice>(
						// TODO: Channel is hard-coded
						Factory.createNotice("general", `Your ping is ~${ping}ms (${Utils.determinePingState(ping)})`)
					);
				}
			},
			{
				name: "notify",
				description: "Play the notification sound",

				handle(): void {
					App.notify();
				}
			}
		]);
	}

	public init(): void {
		this.test();
		Actions.setGeneralAsActiveChannel();
		this.registerCommands();
		this.render();
		this.gateway.start();
	}

	public test(): void {
		//
	}
}
