import {CommandHandle} from "./command-handler";

export interface ICommand {
    readonly name: string;
    readonly description?: string;
    readonly handle: CommandHandle;
}