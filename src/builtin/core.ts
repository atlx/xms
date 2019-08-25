import Plugin from "../plugin/plugin";
import IPluginContext from "../plugin/context";
import Message from "../models/message";
import MessageEvent from "../net/messageEvent";
import AppEvent from "../plugin/appEvent";

export default class Core extends Plugin {
    public constructor() {
        super({
            name: "Core",
            author: "Atlas",
            description: "Core functionality and services.",
            permissions: [PluginPermission.UI],
            version: "1.0.0"
        });
    }

    public install(): void {
        //
    }

    public enable(context: IPluginContext): void {
        context.basic.on(AppEvent.Ready, () => {
            if (context.ui)
        });
    }
}
