import PluginNetwork from "./network";
import PluginFileSystem from "./fileSystem";
import PluginMessages from "./messages";
import PluginEventRouter from "./router";

export default interface IPluginContext {
    readonly net?: PluginNetwork;

    readonly fs?: PluginFileSystem;

    readonly msg?: PluginMessages;

    readonly eventRouter?: PluginEventRouter;
}
