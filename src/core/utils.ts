import os from "os";

export default abstract class Utils {
    public static getLocalAddresses() {
        const interfaces = os.networkInterfaces();
        const result: any[] = [];

        Object.keys(interfaces).forEach((ifname) => {
            let alias = 0;

            interfaces[ifname].forEach((iface) => {
                if (iface.family !== "IPv4" || iface.internal !== false)
                // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                {
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

}