import dgram, {Socket} from "dgram";
import {AddressInfo} from "net";
import {GatewayMsg, GatewayMsgType} from "./gatewayEntities";
import {ConnectionState} from "../store/store";
import MiscAction from "../actions/misc";
import Factory from "../core/factory";
import Util from "../core/util";
import App, {IDisposable} from "../core/app";
import SystemMessage from "../core/systemMessage";
import {INotice, NoticeStyle} from "../models/message";
import {SpecialChannel} from "../models/channel";
import MessageAction from "../actions/message";
import {IGatewayOptions} from "./gatewayOptions";
import {EventEmitter} from "events";
import NetworkEvent from "./networkEvent";

export default class Gateway extends EventEmitter implements IDisposable {
    public static slowThreshold: number = 150;

    private readonly _options: IGatewayOptions;

    private readonly intervals: number[];

    private readonly pingHistory: number[];

    private socket!: Socket;

    private pingStart: number;

    private connectionVerified: boolean;

    private socketConnected: boolean;

    public constructor(options: IGatewayOptions) {
        super();

        this._options = options;
        this.intervals = [];
        this.connectionVerified = false;
        this.pingStart = 0;
        this.pingHistory = [];
        this.socketConnected = false;

        // Bindings.
        this.handleSocketClose = this.handleSocketClose.bind(this);
    }

    public get options(): IGatewayOptions {
        return this._options;
    }

    /**
     * Whether the socket is connected.
     */
    public get connected(): boolean {
        return this.socketConnected;
    }

    public setInterval(action: any, time: number, call: boolean = true): this {
        if (call) {
            action.bind(this)();
        }

        this.intervals.push(setInterval(action.bind(this), time) as any);

        return this;
    }

    public clearIntervals(): this {
        for (const interval of this.intervals) {
            clearInterval(interval);
        }

        return this;
    }

    public get lastPing(): number {
        return this.pingHistory.length === 0 ? -1 : this.pingHistory[this.pingHistory.length - 1];
    }

    protected registerPing(ping: number): this {
        this.pingHistory.push(ping);

        // Update the store.
        MiscAction.addPing(ping);

        // Reset time counter.
        this.pingStart = 0;

        return this;
    }

    protected startPingTimer(): this {
        this.pingStart = performance.now();

        return this;
    }

    protected handleSocketClose(): void {
        this.socketConnected = false;
        MiscAction.setInputLocked(true);
        this.dispose();
        console.log("[BroadcastGateway] Disconnected");
        MessageAction.addToGeneral<INotice>(Factory.createNotice(SpecialChannel.General, SystemMessage.Disconnected, NoticeStyle.Warning));

        /**
         * TODO: Changing to page init is OKAY since it's meant to handle
         * disconnections, but what about instead setting connection state in UI status bar?
         */
        // Actions.setPage(Page.Init);

        MiscAction.setConnectionState(ConnectionState.Disconnected);
    }

    private setupEvents(): this {
        this.socket.on("listening", () => {
            this.socket.addMembership(this._options.address);
            this.socketConnected = true;
            console.log(`[BroadcastGateway] Listening on ${this._options.address}@${this._options.port}`);

            // Start the heartbeat loop.
            this.setInterval(this.heartbeat, this._options.heartbeatInterval);

            // Start the network interface availability loop.
            this.setInterval(() => {
                if (!Util.isNetworkAvailable()) {
                    this.close(this.handleSocketClose);
                }
            }, 3000);

            MiscAction.setConnectionState(ConnectionState.Connected);

            MessageAction.addToGeneral<INotice>(
                Factory.createNotice(SpecialChannel.General, SystemMessage.Connected)
            );

            // TODO: Is last ping set at the starting point?
            if (this.lastPing >= Gateway.slowThreshold) {
                MessageAction.addToGeneral<INotice>(
                    Factory.createNotice(
                        SpecialChannel.General,
                        SystemMessage.HighLatency,
                        NoticeStyle.Warning
                    )
                );
            }

            MiscAction.setInputLocked(false);
        });

        this.socket.on("close", this.handleSocketClose);

        this.socket.on("message", (data: Buffer, sender: AddressInfo) => {
            this.emit(NetworkEvent.Data, {
                data,
                sender
            });
        });

        this.socket.on("error", (error: Error) => {
            console.log(`[BroadcastGateway.setupEvents] Socket threw error with message: ${error.message}`);
        });

        return this;
    }

    private heartbeat(): this {
        this.startPingTimer();
        this.broadcast(GatewayMsgType.Heartbeat, {});

        return this;
    }

    public toggleConnected(): this {
        if (this.socketConnected) {
            this.close();
        }
        else {
            this.connect();
        }

        return this;
    }

    public restart(): this {
        this.close(() => {
            // TODO: Shouldn't be sent by message, handled by the init page instead.
            // TODO: Hard-coded channel.
            MessageAction.addToGeneral<INotice>(Factory.createNotice(SpecialChannel.General, "Attempting to reconnect."));
            this.connect();
        });

        return this;
    }

    public close(callback?: () => void): void {
        /**
         * No need to invoke handleSocketClose()
         * since it will be invoked whenever socket is closed.
         */
        this.socket.close(() => {
            if (callback !== undefined) {
                callback();
            }
        });
    }

    public broadcast<T>(type: GatewayMsgType, payload: T): void {
        const data: Buffer = Buffer.from(JSON.stringify({
            type,
            time: Date.now(),
            payload,
            sender: App.me.id
        } as GatewayMsg<T>));

        this.socket.send(data, 0, data.length, this._options.port, this._options.address, (error: Error | null) => {
            if (error !== null) {
                console.log(`[BroadcastGateway.emit] Failed to emit message: ${error.message}`);

                return;
            }

            console.log(`[BroadcastGateway.emit] Sent ${data.length} bytes`);
        });
    }

    public dispose(): void {
        this.clearIntervals();
    }

    public connect(): this {
        if (this.connected) {
            this.dispose();
        }

        // Create the socket.
        this.socket = dgram.createSocket({
            type: "udp4",
            reuseAddr: true
        });

        this.setupEvents();
        this.socket.bind(this._options.port);

        return this;
    }
}
