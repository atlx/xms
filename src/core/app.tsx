import React from "react";
import Application from "../components/application";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../store/store";

export default class App {
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
	}

	public test(): void {
		//
	}
}
