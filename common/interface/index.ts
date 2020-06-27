export interface IConfig {
    serverConfig: {
        port: number,
    }
    mongo?: {
        url: string,
        poolSize: number,
        appDbName: string,
    },
}
