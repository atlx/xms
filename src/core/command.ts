import {CommandHandle} from "./commandHandler";

export interface ICommand {
    readonly name: string;
    readonly description?: string;
    readonly handle: CommandHandle;
}
