import {IpAddress} from "../models/models";
import net, {Socket, Server} from "net";
import Utils from "./utils";
import Validator from "./validator";
import {EventEmitter} from "events";

export enum NetPacketType {
    Authenticate = "auth",
    Message = "msg"
}

export interface IUnverifiedNetPacket<T = any> {
    readonly type: string;
    readonly payload: T;
}

export interface INetPacket<T = any> extends IUnverifiedNetPacket<T> {
    readonly sender: IpAddress;
    readonly time: number;
    readonly size: number;
}

export interface IConnection {
    readonly socket: Socket;
    readonly authenticated: boolean;
    readonly address: IpAddress;
}

export enum NetEvent {
    Connection = "connection",
    PacketReceived = "packet-received"
}

export interface INetworkHub extends EventEmitter {
    //
}

export type PacketEventAction<T = any> = (packet: INetPacket<T>) => void;

export default class NetworkHub extends EventEmitter implements INetworkHub {
    public static localHost: IpAddress = "127.0.0.1";

    private readonly pool: Map<IpAddress, IConnection>;
    private readonly server: Server;
    private readonly port: number;

    public constructor(port: number) {
        super();

        this.pool = new Map();
        this.port = port;
        this.server = net.createServer();

        // Forward all packet received events into their own types.
        this.on(NetEvent.PacketReceived, (packet: INetPacket): void => {
            this.emit(packet.type);
        });
    }

    private handleConnection(client: Socket): void {
        if (!client.remoteAddress) {
            return;
        }
        // Destroy client if already exists.
        else if (this.pool.has(client.remoteAddress)) {
            const oldSocket: Socket = (this.pool.get(client.remoteAddress) as IConnection).socket;

            if (!oldSocket.destroyed) {
                oldSocket.destroy();
            }

            this.pool.set(client.remoteAddress, {
                address: client.remoteAddress,
                authenticated: false,
                socket: client
            });
        }

        // Remove client from pool upon being closed/timed out.
        client.once("close", () => this.destroyClient(client));
        client.once("timeout", () => this.destroyClient(client));

        client.on("data", (raw: Buffer) => {
            const data: string = raw.toString();

            if (!Utils.isJson(data)) {
                // Destroy client upon invalid data.
                this.destroyClient(client);

                return;
            }

            const packet: IUnverifiedNetPacket<any> = JSON.parse(data);

            if (!Validator.netPacket(packet)) {
                // Also destroy client upon malformed packet.
                this.destroyClient(client);

                return;
            }

            // Emit the packet received event which will be forwarded.
            this.emit(NetEvent.PacketReceived, {
                ...packet,
                sender: client.remoteAddress as string,
                time: Date.now(),
                size: data.length
            });
        });
    }

    public authOn(event: NetPacketType, ...actions: PacketEventAction[]): this {
        this.on(event, (packet: INetPacket): void => {
            // Only forward if sender address is authenticated.
            if (this.isAuthenticated(packet.sender)) {
                for (const action of actions) {
                    action(packet);
                }
            }
        });

        return this;
    }

    public isAuthenticated(address: IpAddress): boolean {
        return this.pool.has(address) && (this.pool.get(address) as IConnection).authenticated;
    }

    private destroyClient(client: Socket): void {
        if (!client.destroyed) {
            client.destroy();
        }

        this.pool.delete(client.remoteAddress as string);
    }

    private setupEvents(): void {
        this.server.removeAllListeners();

        this.server.once("listening", () => {
            console.log(`[NetworkHub] Listening on ${this.port}`);
        });

        this.server.on("connection", this.handleConnection);

        this.server.on("close", () => {
            for (let [key, value] of this.pool) {
                if (!value.socket.destroyed) {
                    value.socket.destroy();
                }
            }

            this.pool.clear();
            console.log("[NetworkHub] Closed");
        });
    }

    public start(): void {
        if (this.server.listening) {
            this.server.close(this.start);

            return;
        }

        this.setupEvents();
        this.server.listen(this.port, NetworkHub.localHost);
    }
}
