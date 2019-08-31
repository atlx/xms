export default interface IPluginManifest {
    readonly name: string;

    readonly id?: string;

    readonly version: string;

    readonly author?: string;

    readonly description?: string;
}
