import dgram, {Socket} from "dgram";
import {AddressInfo} from "net";
import {GatewayMessage, GatewayMessageType, GatewayHelloMessage, GatewayMessageMessage} from "./gateway";
import {store, AppState} from "../store/store";
import Actions from "../store/actions";

export default class BroadcastGateway {
    public readonly groupAdress: string;
    public readonly port: number;

    private readonly socket: Socket;

    public constructor(groupAddress: string, port: number) {
        this.groupAdress = groupAddress;
        this.port = port;
        this.socket = dgram.createSocket("udp4");
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

    public emit(message: GatewayMessage): void {
        this.socket.send(JSON.stringify(message), this.port, this.groupAdress);
    }

    public start(): void {
        this.socket.bind(this.port, "127.0.0.1");
    }
}