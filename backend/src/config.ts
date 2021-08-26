export interface ChatServerConfig {
    bufferSize: number;
    snapshotFilename: string;
    snapshotInterval: number;
}

export interface HttpServerConfig {
    corsOrigin: string;
    port: number;
}

export interface Config {
    chatServer: ChatServerConfig;
    httpServer: HttpServerConfig;
}

const config: Config = {
    chatServer: {
        bufferSize: 100,
        snapshotFilename: "chatSnapshot.json",
        snapshotInterval: 5 * 60 * 1000,
    },
    httpServer: {
        corsOrigin: "",
        port: 3001,
    },
};
export default config;
