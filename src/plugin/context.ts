import PluginNetwork from "./network";
import PluginFileSystem from "./fileSystem";
import PluginMessages from "./messages";
import PluginEventRouter from "./router";
import PluginBasic from "./basic";

export default interface IPluginContext {
    readonly basic: PluginBasic;

    readonly net?: PluginNetwork;

    readonly fs?: PluginFileSystem;

    readonly messages?: PluginMessages;

    readonly eventRouter?: PluginEventRouter;
}
