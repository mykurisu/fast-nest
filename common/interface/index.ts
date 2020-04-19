export interface IConfig {
    serverConfig: {
        port: number,
        selfUrl: string
    }
    mongo: {
        url: string,
        poolSize: number,
        appDbName: string,
    },
}
