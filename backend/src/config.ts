export interface ChatServerConfig {
    bufferSize: number;
    snapshotFilename: string;
    snapshotInterval: number;
}

export interface Config {
    chatServer: ChatServerConfig;
}

const config: Config = {
    chatServer: {
        bufferSize: 100,
        snapshotFilename: "chatSnapshot.json",
        snapshotInterval: 5 * 60 * 1000,
    },
};
export default config;
