import {IpAddress} from "../types/types";
import net, {Socket, Server} from "net";
import Utils from "../core/utils";

export type StreamHandler<T = any> = (data: T) => void;

export default class Stream {
    private readonly destination: IpAddress;
    private readonly localPort: number;

    private receiver: Server | null;
    private remote: Socket | null;
    private dispatcher: Socket | null;

    public constructor(localPort: number, destination: IpAddress) {
        this.localPort = localPort;
        this.destination = destination;
        this.remote = null;
        this.receiver = null;
        this.dispatcher = null;
    }

    public open(handler: StreamHandler): this {
        // Create receiver
        this.receiver = net.createServer((client: Socket) => {
            if (client.remoteAddress && client.remoteAddress === this.destination) {
                this.remote = client;

                this.remote.on("data", (rawData: Buffer) => {
                    const data: string = rawData.toString();

                    if (Utils.isJson(data)) {
                        handler(JSON.parse(data));
                    }
                });
            }
        });

        this.receiver.listen(this.localPort, "127.0.0.1");

        // Create dispatcher
        this.dispatcher = new Socket();

        this.dispatcher.on("data", () => {})

        return this;
    }

    public write(data: any): this {
        if (this.remote === null) {
            throw new Error("[Stream] Cannot write while remote socket is null");
        }

        return this;
    }

    public close(): this {
        return this;
    }
}