import dgram, {Socket} from "dgram";
import {AddressInfo} from "net";
import {GatewayMsg, GatewayMsgType, HelloPayload, MessagePayload, HeartbeatPayload} from "./gateway";
import {store, IAppState, ConnectionState} from "../store/store";
import Actions from "../store/actions";
import {IMessage, INotice, NoticeStyle, SpecialChannel} from "../models/models";
import Factory from "../core/factory";
import Utils from "../core/utils";
import {IDisposable} from "../core/app";
import {MainApp} from "../index";
import SystemMessages from "../core/systemMessages";

export default class BroadcastGateway implements IDisposable {
    public static slowThreshold: number = 150;

    public readonly groupAddress: string;
    public readonly port: number;

    private readonly heartbeatInterval: number;
    private readonly intervals: number[];
    private readonly pingHistory: number[];

    private socket!: Socket;
    private pingStart: number;
    private connectionVerified: boolean;
    private socketConnected: boolean;

    public constructor(groupAddress: string, port: number, heartbeatInterval: number = 10_000) {
        this.groupAddress = groupAddress;
        this.port = port;
        this.heartbeatInterval = heartbeatInterval;
        this.intervals = [];
        this.connectionVerified = false;
        this.pingStart = 0;
        this.pingHistory = [];
        this.socketConnected = false;

        // Bindings.
        this.handleSocketClose = this.handleSocketClose.bind(this);
    }

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
        Actions.addPing(ping);

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
        Actions.setInputLocked(true);
        this.dispose();
        console.log("[BroadcastGateway] Disconnected");
        Actions.addGeneralMessage<INotice>(Factory.createNotice(SpecialChannel.General, SystemMessages.Disconnected, NoticeStyle.Warning));

        /**
         * TODO: Changing to page init is OKAY since it's meant to handle
         * disconnections, but what about instead setting connection state in UI status bar?
         */
        // Actions.setPage(Page.Init);

        Actions.setConnectionState(ConnectionState.Disconnected);
    }

    private setupEvents(): this {
        this.socket.on("listening", () => {
            this.socket.addMembership(this.groupAddress);
            this.socketConnected = true;
            console.log(`[BroadcastGateway] Listening on ${this.groupAddress}@${this.port}`);

            // Start the heartbeat loop.
            this.setInterval(this.heartbeat, this.heartbeatInterval);

            // Start the network interface availability loop.
            this.setInterval(() => {
                if (!Utils.isNetworkAvailable()) {
                    this.close(this.handleSocketClose);
                }
            }, 3000);

            Actions.setConnectionState(ConnectionState.Connected);

            // TODO: Channel?
            Actions.addGeneralMessage<INotice>(
                Factory.createNotice(SpecialChannel.General, SystemMessages.Connected)
            );

            // TODO: Is last ping set at the starting point?
            if (this.lastPing >= BroadcastGateway.slowThreshold) {
                // TODO: channel
                Actions.addGeneralMessage<INotice>(
                    Factory.createNotice(
                        SpecialChannel.General,
                        SystemMessages.HighLatency,
                        NoticeStyle.Warning
                    )
                );
            }

            Actions.setInputLocked(false);
        });

        this.socket.on("close", this.handleSocketClose);

        this.socket.on("message", (data: Buffer, sender: AddressInfo) => {
            const messageString: string = data.toString();

            // TODO: Debugging
            console.log(`[BroadcastGateway.setupEvents] Received message string: ${messageString}`);

            if (messageString.startsWith("{") && messageString.endsWith("}")) {
                const msg: GatewayMsg<any> = JSON.parse(messageString);

                // If the message was sent by the local client.
                if (msg.sender === MainApp.me.id) {
                    if (msg.type === GatewayMsgType.Message) {
                        const payload: MessagePayload = msg.payload;

                        Actions.markMessageSent(payload.id);
                    }
                    else if (msg.type === GatewayMsgType.Heartbeat) {
                        const ping: number = Math.round(performance.now() - this.pingStart);

                        this.registerPing(ping);

                        if (!this.connectionVerified) {
                            this.connectionVerified = true;
                        }
                    }
                    else {
                        console.log(`[BroadcastGateway:Message] Unknown message type from self: ${msg.type}`);
                    }

                    return;
                }

                // TODO: Use handlers instead
                if (msg.type === GatewayMsgType.Hello) {
                    // TODO: Make use of the time difference & adjust time proxy for this user
                    const payload: HelloPayload = msg.payload;

                    if (!(store.getState() as IAppState).category.usersMap.has(msg.sender)) {
                        Actions.addUser(payload.user);
                    }
                }
                // Handle incoming message.
                else if (msg.type === GatewayMsgType.Message) {
                    const payload: MessagePayload = msg.payload;

                    if ((store.getState() as IAppState).category.usersMap.has(msg.sender)) {
                        // TODO
                    }
                    else {
                        // TODO: Fix
                        // TODO: Verify type and data
                        Actions.addGeneralMessage({
                            // TODO: A way to safely identify an unknown sender, or is it not required?
                            authorAvatarHash: "",
                            authorName: "Unknown",
                            id: "unknown",
                            systemMessage: false,
                            text: payload.text,
                            sent: true,

                            // TODO: Time should be provided by sender
                            time: Date.now(),
                            channelId: SpecialChannel.General,
                            type: payload.type
                        } as IMessage);
                    }
                }
                else {
                    console.log(`[BroadcastGateway] Received an invalid message from '${sender.address}' with type '${msg.type}'`)
                }
            }
        });

        this.socket.on("error", (error: Error) => {
            console.log(`[BroadcastGateway.setupEvents] Socket threw error with message: ${error.message}`);
        });

        return this;
    }

    private heartbeat(): this {
        this.startPingTimer();

        this.broadcast<HeartbeatPayload>(GatewayMsgType.Heartbeat, {
            //
        });

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
            Actions.addGeneralMessage<INotice>(Factory.createNotice(SpecialChannel.General, "Attempting to reconnect."));
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
            sender: MainApp.me.id
        } as GatewayMsg<T>));

        this.socket.send(data, 0, data.length, this.port, this.groupAddress, (error: Error | null) => {
            if (error !== null) {
                console.log(`[BroadcastGateway.emit] Failed to emit message: ${error.message}`);

                return;
            }

            console.log(`[BroadcastGateway.emit] Sent ${data.length} bytes`);
        });
    }

    public dispose(): this {
        this.clearIntervals();

        return this;
    }

    public connect(): this {
        // Create the socket.
        this.socket = dgram.createSocket({
            type: "udp4",
            reuseAddr: true
        });

        this.setupEvents();
        this.socket.bind(this.port);

        return this;
    }
}
