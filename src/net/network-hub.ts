import {IpAddress} from "../types/types";
import net, {Socket, Server} from "net";
import Utils from "../core/utils";
import Validator from "../core/validator";

export enum NetPacketType {
    Authenticate
}

export interface IUnsignedNetPacket<T> {
    readonly type: NetPacketType;
    readonly payload: T;
}

export interface INetPacket<T> extends IUnsignedNetPacket<T> {
    readonly sender: IpAddress;
    readonly time: number;
    readonly size: number;
}

export interface IConnection {
    readonly socket: Socket;
    readonly authenticated: boolean;
    readonly address: IpAddress;
}

type PacketHandler<T> = (packet: INetPacket<T>, authenticated: boolean) => void;

// TODO: Missing ability to un-register handlers
export default class NetworkHub {
    private readonly pool: Map<IpAddress, IConnection>;
    private readonly server: Server;
    private readonly port: number;
    private readonly handlers: Map<NetPacketType, PacketHandler<any>[]>;

    public constructor(port: number) {
        this.handlers = new Map();
        this.pool = new Map();
        this.port = port;
        this.server = net.createServer();
    }

    public handle<T>(type: NetPacketType, handler: PacketHandler<T>): void {
        if (this.handlers.has(type)) {
            const handlers: PacketHandler<any>[] = this.handlers.get(type) as PacketHandler<any>[];

            handlers.push(handler);
        }
        else {
            this.handlers.set(type, [handler]);
        }
    }

    private handleConnection(client: Socket): void {
        if (!client.remoteAddress) {
            return;
        }
        // Destroy client if already exists
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

        // Remove client from pool upon being closed/timed out
        client.once("close", () => this.destroyClient(client));
        client.once("timeout", () => this.destroyClient(client));

        client.on("data", (raw: Buffer) => {
            const data: string = raw.toString();

            if (!Utils.isJson(data)) {
                // Destroy client upon invalid data
                this.destroyClient(client);

                return;
            }

            const packet: IUnsignedNetPacket<any> = JSON.parse(data);

            if (!Validator.netPacket(packet)) {
                // Also destroy client upon malformed packet
                this.destroyClient(client);

                return;
            }

            this.dispatch({
                ...packet,
                sender: client.remoteAddress as string,
                time: Date.now(),
                size: data.length
            });
        });
    }

    public dispatch<T>(packet: INetPacket<T>): void {
        if (this.handlers.has(packet.type)) {
            const handlers: PacketHandler<T>[] = this.handlers.get(packet.type) as PacketHandler<T>[];

            for (let i = 0; i < handlers.length; i++) {
                handlers[i](packet, this.isAuthenticated(packet.sender));
            }
        }
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

        this.server.listen(this.port, "127.0.0.1");
    }
}