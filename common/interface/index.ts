import { logOptions } from '@mykurisu/fast-nest-logger'

export interface IConfig {
    serverConfig: {
        port: number,
    }
    logOptions?: logOptions
}
