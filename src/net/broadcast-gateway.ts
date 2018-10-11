import dgram, {Socket} from "dgram";
import {AddressInfo} from "net";
import {GatewayMessage, GatewayMessageType, GatewayHelloMessage, GatewayMessageMessage} from "./gateway";
import {store, AppState} from "../store/store";
import Actions from "../store/actions";
import Utils from "../core/utils";
import {app} from "..";

export default class BroadcastGateway {
    public readonly groupAdress: string;
    public readonly port: number;

    private readonly socket: Socket;

    public constructor(groupAddress: string, port: number) {
        this.groupAdress = groupAddress;
        this.port = port;

        this.socket = dgram.createSocket({
            type: "udp4",
            reuseAddr: true
        });

        this.setupEvents();
    }

    private setupEvents(): void {
        this.socket.on("listening", () => {
            this.socket.setBroadcast(true);
            this.socket.setMulticastTTL(128);
            this.socket.addMembership(this.groupAdress);

            console.log(`[BroadcastGateway] Listening on ${this.groupAdress}@${this.port}`)
        });

        this.socket.on("message", (data: Buffer, sender: AddressInfo) => {
            const messageString: string = data.toString();

            // TODO: Debugging
            console.log(`[BroadcastGateway.setupEvents] Received message string: ${messageString}`);

            if (messageString[0] === "{" && messageString[messageString.length - 1] === "}") {
                const message: GatewayMessage = JSON.parse(messageString);

                if (message.sender === app.me.id) {
                    if (message.type === GatewayMessageType.Message) {
                        const payload: GatewayMessageMessage = message.payload;

                        Actions.markMessageSent(payload.id);
                    }
                    else {
                        console.log(`[BroadcastGateway:Message] Unknown message type from self: ${message.type}`);
                    }

                    return;
                }

                // TODO: Use handlers instead
                if (message.type === GatewayMessageType.Hello) {
                    // TODO: Make use of the time difference & adjust time proxy for this user
                    const payload: GatewayHelloMessage = message.payload;

                    if (!(store.getState() as AppState).usersMap.has(message.sender)) {
                        Actions.addUser(payload.user);
                    }
                }
                else if (message.type === GatewayMessageType.Message) {
                    const payload: GatewayMessageMessage = message.payload;

                    if ((store.getState() as AppState).usersMap.has(message.sender)) {
                        // TODO
                    }
                    else {
                        Actions.addMessage({
                            // TODO: A way to safely identify an unknown sender, or is it not required?
                            authorAvatarUrl: "",
                            authorName: "Unknown",
                            id: "unknown",
                            systemMessage: false,
                            text: payload.text,
                            sent: true,
                            
                            // TODO: Time should be provided by sender
                            time: Date.now()
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
    }

    public emit(type: GatewayMessageType, message: any): void {
        const data: any = JSON.stringify({
            type,
            time: Date.now(),
            payload: message,
            sender: app.me.id
        } as GatewayMessage);

        this.socket.send(data, 0, data.length, this.port, this.groupAdress);

        console.log(`[BroadcastGateway.emit] Sent ${data.length} bytes`);
    }

    public start(): void {
        const localAddress: string = Utils.getLocalAddresses()[0];

        this.socket.bind(this.port, localAddress);
        console.log(`[BroadcastGateway.start] Bound to ${localAddress}@${this.port}`);
    }
}