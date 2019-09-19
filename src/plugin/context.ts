import PluginNetwork from "./network";
import PluginFileSystem from "./fileSystem";
import PluginMessages from "./messages";
import PluginEventBroker from "./eventBroker";
import PluginBasic from "./basic";

export default interface IPluginContext {
    readonly basic: PluginBasic;

    readonly net: PluginNetwork;

    readonly fs: PluginFileSystem;

    readonly messages: PluginMessages;

    readonly eventRouter: PluginEventBroker;
}
