import IPluginContext from "./context";
import IPluginManifest from "./manifest";

export default abstract class Plugin {
    public readonly manifest: IPluginManifest;

    public constructor(manifest: IPluginManifest) {
        this.manifest = manifest;
    }

    public abstract enable(context: IPluginContext): void;

    public disable(): void {
        //
    }

    public uninstall(): void {
        //
    }
}
