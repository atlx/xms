import Message from "@/models/message";
import {EventEmitter} from "events";

export interface IMessageOptions {
    readonly content: string;

    readonly channelId: string;
}

export default class PluginMessages extends EventEmitter {
    public constructor() {
        super();
    }

    public send(options: IMessageOptions): Promise<Message> {
        // TODO
        return false as any;
    }
}
