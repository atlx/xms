import dgram, {Socket} from "dgram";
import {AddressInfo} from "net";
import {GatewayMsg, GatewayMsgType, HelloPayload, MessagePayload, HeartbeatPayload} from "./gateway";
import {store, AppState} from "../store/store";
import Actions from "../store/actions";
import Utils from "../core/utils";
import {app} from "..";
import {IDisposable} from "../core/interfaces";

export default class BroadcastGateway implements IDisposable {
    public readonly groupAdress: string;
    public readonly port: number;

    private readonly socket: Socket;
    private readonly heartbeatInterval: number;
    private readonly intervals: NodeJS.Timeout[];

    public constructor(groupAddress: string, port: number, heartbeatInterval: number = 5000) {
        this.groupAdress = groupAddress;
        this.port = port;
        this.heartbeatInterval = heartbeatInterval;
        this.intervals = [];

        // Create socket
        this.socket = dgram.createSocket({
            type: "udp4",
            reuseAddr: true
        });

        this.setupEvents();
    }

    public setInterval(action: any, time: number): this {
        this.intervals.push(setTimeout(action.bind(this), time));

        return this;
    }

    public clearIntervals(): this {
        for (let i = 0; i < this.intervals.length; i++) {
            clearInterval(this.intervals[i]);
        }

        return this;
    }

    private setupEvents(): this {
        this.socket.on("listening", () => {
            this.socket.setBroadcast(true);
            this.socket.setMulticastTTL(128);
            this.socket.addMembership(this.groupAdress);

            console.log(`[BroadcastGateway] Listening on ${this.groupAdress}@${this.port}`);

            // Start heartbeat loop
            this.setInterval(this.heartbeat, this.heartbeatInterval);
        });

        // TODO: Implement
        // this.socket.on("close")

        this.socket.on("message", (data: Buffer, sender: AddressInfo) => {
            const messageString: string = data.toString();

            // TODO: Debugging
            console.log(`[BroadcastGateway.setupEvents] Received message string: ${messageString}`);

            if (messageString.startsWith("{") && messageString.endsWith("}")) {
                const message: GatewayMsg<any> = JSON.parse(messageString);

                if (message.sender === app.me.id) {
                    if (message.type === GatewayMsgType.Message) {
                        const payload: MessagePayload = message.payload;

                        Actions.markMessageSent(payload.id);
                    }
                    else {
                        console.log(`[BroadcastGateway:Message] Unknown message type from self: ${message.type}`);
                    }

                    return;
                }

                // TODO: Use handlers instead
                if (message.type === GatewayMsgType.Hello) {
                    // TODO: Make use of the time difference & adjust time proxy for this user
                    const payload: HelloPayload = message.payload;

                    if (!(store.getState() as AppState).usersMap.has(message.sender)) {
                        Actions.addUser(payload.user);
                    }
                }
                else if (message.type === GatewayMsgType.Message) {
                    const payload: MessagePayload = message.payload;

                    if ((store.getState() as AppState).usersMap.has(message.sender)) {
                        // TODO
                    }
                    else {
                        // TODO: Fix
                        Actions.addMessage({
                            // TODO: A way to safely identify an unknown sender, or is it not required?
                            authorAvatarUrl: "",
                            authorName: "Unknown",
                            id: "unknown",
                            systemMessage: false,
                            text: payload.text,
                            sent: true,
                            
                            // TODO: Time should be provided by sender
                            time: Date.now(),
                            channelId: ""
                        });
                    }
                }
                else {
                    console.log(`[BroadcastGateway] Received an invalid message from '${sender.address}' with type '${message.type}'`)
                }
            }
        });

        this.socket.on("error", (error: Error) => {
            console.log(`[BroadcastGateway.setupEvents] Socket threw error with message: ${error.message}`);
        });

        return this;
    }

    private heartbeat(): this {
        this.emit<HeartbeatPayload>(GatewayMsgType.Heartbeat, {
            //
        });

        return this;
    }

    public emit<T>(type: GatewayMsgType, payload: T): void {
        const data: Buffer = Buffer.from(JSON.stringify({
            type,
            time: Date.now(),
            payload,
            sender: app.me.id
        } as GatewayMsg<T>));

        this.socket.send(data, this.port, 0, data.length, this.groupAdress, (error: Error | null) => {
            if (error !== null) {
                console.log(`[BroadcastGateway.emit] Failed to emit message: ${error.message}`);
            }

            console.log(`[BroadcastGateway.emit] Sent ${data.length} bytes`);
        });
    }

    public dispose(): this {
        this.clearIntervals();

        return this;
    }

    public start(): this {
        const localAddress: string = Utils.getLocalAddresses()[0];

        this.socket.bind(this.port, localAddress);
        console.log(`[BroadcastGateway.start] Bound to ${localAddress}@${this.port}`);

        return this;
    }
}