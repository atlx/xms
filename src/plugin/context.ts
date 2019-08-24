import PluginNetwork from "./network";
import PluginFileSystem from "./fileSystem";
import PluginMessages from "./messages";
import PluginEventRouter from "./router";
import PluginPublic from "./public";

export default interface IPluginContext {
    readonly public: PluginPublic;

    readonly net?: PluginNetwork;

    readonly fs?: PluginFileSystem;

    readonly msg?: PluginMessages;

    readonly eventRouter?: PluginEventRouter;
}
