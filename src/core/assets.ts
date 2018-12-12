import path from "path";

type IPaths = {
    readonly resources: string[];
}

export default class Paths {
    private static basePaths: IPaths = {
        resources: ["resources"]
    };

    public static resource(name: string, baseDirectory: string, ext: string): string {
        return Paths.join(...Paths.basePaths.resources, baseDirectory, `${name}.${ext}`);
    }

    private static join(...args: string[]): string {
        return path.join("..", ...args);
    }
}