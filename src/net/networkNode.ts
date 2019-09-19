import {Socket} from "net";
import {IpAddress} from "@/models/misc";

export interface INetworkNodeOptions {
    readonly socket: Socket;

    readonly authenticated: boolean;

    readonly address: IpAddress;
}

export default class NetworkNode {
    public readonly socket: Socket;

    public readonly address: IpAddress;

    protected _authenticated: boolean;

    public constructor(options: INetworkNodeOptions) {
        this.socket = options.socket;
        this.address = options.address;
        this._authenticated = options.authenticated;
    }

    public get authenticated(): boolean {
        return this._authenticated;
    }
}
