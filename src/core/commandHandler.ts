import {ICommand} from "./command";
import {IGuideItem} from "../models/misc";
import {Map as ImmutableMap} from "immutable";
import {BasicMap} from "./helpers";

export type CommandHandle = (args: string[]) => void;

export default class CommandHandler {
    public commands: BasicMap<ICommand>;

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

    public getAllAsAutoCompleteCommands(): IGuideItem[] {
        const result: IGuideItem[] = [];

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
