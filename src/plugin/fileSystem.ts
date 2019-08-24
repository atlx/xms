export default class PluginFileSystem {
    public createFile(path: string, data: Buffer): Promise<boolean> {
        // TODO
        return false as any;
    }

    public exists(path: string): boolean {
        // TODO
        return false;
    }

    public createDirectory(path: string): Promise<boolean> {
        // TODO
        return false as any;
    }

    public readFile(path: string): Promise<Buffer> {
        // TODO
        return false as any;
    }
}
