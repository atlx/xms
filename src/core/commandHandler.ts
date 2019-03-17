import {ICommand} from "./command";
import {IAutoCompleteItem} from "../models/misc";
import {Map as ImmutableMap} from "immutable";

export type CommandHandle = (args: string[]) => void;

export default class CommandHandler {
    public commands: ImmutableMap<string, ICommand>;

    public constructor() {
        this.commands = ImmutableMap();
    }

    // TODO: Validate command name
    public register(command: ICommand): CommandHandler {
        if (this.commands.has(command.name)) {
            throw new Error(`[CommandHandler] A command with the name '${command.name}' is already registered`);
        }

        const clone: CommandHandler = new CommandHandler();

        clone.commands = this.commands.set(command.name.toLowerCase(), command);

        return clone;
    }

    public handle(commandName: string, args: string[] = []): void {
        if (this.commands.has(commandName)) {
            const command: ICommand = this.commands.get(commandName) as ICommand;

            command.handle(args);
        }
    }

    public getAllAsAutoCompleteCommands(): IAutoCompleteItem[] {
        const result: IAutoCompleteItem[] = [];

        for (let [key, value] of this.commands) {
            result.push({
                id: key,
                name: value.name,
                subtext: value.description
            });
        }

        return result;
    }
}
