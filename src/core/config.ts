import fs from "fs";
import os from "os";
import Auth, {IKeyPair} from "./auth";
import {UniqueId} from "../models/misc";
import Util from "./util";
import {UserState} from "../models/user";

export interface IConfig {
    /**
     * A unique id to identify the user.
     */
    readonly id: UniqueId;
    
    /**
     * The desired username of the user.
     */
    readonly username: string;

    /**
     * The user's RSA key-pair used for encryption and security.
     */
    readonly keyPair: IKeyPair;
    
    /**
     * A timestamp representing the exact user creation time.
     */
    readonly createdTime: number;

    /**
     * The user's last state.
     */
    readonly state: UserState;

    /**
     * The user's status message.
     */
    readonly status?: string;
}

export default abstract class Config {
    /**
     * The config file path.
     */
    public static location: string = "config.json";

    /**
     * The loaded config. Initially intentionally undefined.
     */
    protected static config: IConfig;

    /**
     * Whether the loaded config has been modified and not yet saved.
     */
    protected static needsSave: boolean;

    /**
     * Retrieve existing config or create it if it doesn't exist.
     */
    public static getOrCreate(): IConfig {
        if (Config.exists) {
            return Config.get();
        }

        return Config.create();
    }

    /**
     * Retrieve loaded config.
     */
    public static get(): IConfig {
        return Config.config;
    }

    /**
     * Determine whether config is loaded.
     */
    public static get loaded(): boolean {
        return Config.config !== undefined;
    }

    /**
     * Generate a new config with default values.
     */
    public static generate(): IConfig {
        const username: string = os.userInfo().username;

        return {
            id: Util.generateId(),
            keyPair: Auth.generateKeyPairSync(),
            username,
            createdTime: Date.now(),
            state: UserState.Online
        };
    }

    /**
     * Determine whether the config file location exists.
     */
    public static get exists(): boolean {
        return fs.existsSync(Config.location);
    }

    /**
     * Attempt to load existing config or create it if it doesn't exist.
     */
    public static loadOrCreate(): IConfig {
        if (Config.exists) {
            return Config.loadSync()!;
        }

        return Config.create();
    }

    /**
     * Synchronously load config from the config file location.
     */
    public static loadSync(): IConfig | null {
        if (!Config.exists) {
            return null;
        }

        this.config = JSON.parse(fs.readFileSync(Config.location).toString());

        return this.config;
    }

    /**
     * Generate and create a default config file.
     * Overwrites existing config file.
     */
    public static create(): IConfig {
        const config: IConfig = Config.generate();

        fs.writeFileSync(Config.location, JSON.stringify(config));

        return config;
    }

    /**
     * Update and replace the config's values.
     * Does not save changes.
     */
    public static update(changes: Partial<IConfig>): void {
        this.config = {
            ...this.config,
            ...changes
        };

        this.needsSave = true;
    }

    /**
     * Update and replace the config's values.
     * Applies changes to config location file.
     */
    public static updateAndSave(changes: Partial<IConfig>): void {
        this.update(changes);
        this.save();
    }

    /**
     * Apply changes and save them into the config location file.
     * Creates a default config if location file does not exist.
     */
    public static save(): void {
        if (!Config.exists) {
            Config.create();

            return;
        }
        // Only save config if needed.
        else if (this.needsSave) {
            fs.writeFileSync(Config.location, JSON.stringify(Config.config));
            this.needsSave = false;
        }
    }
}
