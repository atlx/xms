import os from "os";
import {UniqueId} from "../types/types";
import {CSSProperties} from "react";
import Constants from "./constants";

export default abstract class Utils {
    public static getLocalAddresses() {
        const interfaces = os.networkInterfaces();
        const result: any[] = [];

        Object.keys(interfaces).forEach((ifname) => {
            let alias = 0;

            interfaces[ifname].forEach((iface) => {
                // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                if (iface.family !== "IPv4" || iface.internal !== false) {
                    return;
                }

                if (alias >= 1) {
                    // This single interface has multiple ipv4 addresses
                    // TODO
                    throw new Error("This single interface has multiple ipv4 addresses ->" + ifname + ":" + alias + "<->" + iface.address);
                }
                else {
                    // This interface has only one ipv4 address
                    result.push(iface.address);
                }

                ++alias;
            });
        });

        return result;
    }

    public static generateId(): UniqueId {
        // TODO: Use real generator
        return Math.random().toString().replace(".", "");
    }

    public static determinePingState(ping: number): string {
        if (ping <= 50) {
            return "Excellent";
        }
        else if (ping <= 150) {
            return "Good";
        }

        return "Poor";
    }

    public static isNetworkAvailable(): boolean {
        return Utils.getLocalAddresses().length > 0;
    }

    public static capitalize(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);;
    }

    public static isJson(string: string): boolean {
        return string.startsWith("{") && string.endsWith("}");
    }

    public static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static getWidthStyle(min: number, max: number): CSSProperties {
        return {
            width: `${Utils.getRandomInt(min, max)}px`
        };
    }

    public static getRandomPlaceholderStyle(): CSSProperties {
        return Utils.getWidthStyle(Constants.minPlaceholderNameWidth, Constants.maxPlaceholderNameWidth);
    }
}
