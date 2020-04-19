import { IConfig } from './common/interface'


const config: IConfig =  {
    serverConfig: {
        port: 8000,
        selfUrl: 'http://localhost:8000'
    },
    mongo: {
        url: 'mongodb://localhost:27017',
        poolSize: 30,
        appDbName: 'fast-nest'
    }
}

export default config
