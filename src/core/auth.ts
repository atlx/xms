import crypto from "crypto";
import NodeRSA from "node-rsa";

export interface IKeyPair {
    /**
     * The public key.
     */
    readonly public: string;

    /**
     * The private key.
     */
    readonly private: string;
}

export default abstract class Auth {
    /**
     * Hash input data string using the 'sha1' hash algorithm
     * and return the digested result in hex form.
     */
    public static hash(data: string): string {
        return crypto.createHash("sha1")
            .update(data)
            .digest("hex");
    }

    /**
     * Generates an RSA key-pair with the provided passphrase using the 'crypto' module.
     */
    public static cryptoGenerateKeyPairSync(passphrase: string): IKeyPair {
        const result: crypto.KeyPairSyncResult<string, string> = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,

            publicKeyEncoding: {
                type: "spki",
                format: "pem"
            },

            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
                cipher: "aes-256-cbc",
                passphrase
            }
        });
        
        return {
            public: result.publicKey,
            private: result.privateKey
        };
    }

    /**
     * Generate an RSA key-pair.
     */
    public static generateKeyPairSync(): IKeyPair {
        const key: NodeRSA = new NodeRSA({
            b: 512
        });

        // Generate the keypair.
        key.generateKeyPair();

        return {
            public: key.exportKey("public"),
            private: key.exportKey("private")
        };
    }
}
