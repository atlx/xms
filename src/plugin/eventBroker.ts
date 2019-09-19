import {EventEmitter} from "events";

export default class PluginEventBroker extends EventEmitter {
    public constructor() {
        super();
    }
}
