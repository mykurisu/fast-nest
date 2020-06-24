import fs from 'fs'
import path from 'path'
import { IConfig } from './common/interface'


const config: IConfig =  {
    serverConfig: {
        port: 8000,
    },
    mongo: getMongoConfig()
}

function getMongoConfig(): {
    url: string,
    poolSize: number,
    appDbName: string
} {
    //  可通过环境变量的方式来设定数据库的初始链接
    const { MONGO_URL } = process.env
    let settings = { mongo: '' }

    const isSettingExists: boolean = fs.existsSync(path.join(__dirname, './settings.json'))
    
    //  如果在根目录存在settings.json则会获取其中的数据库链接
    if (isSettingExists) {
        const settingsFile = fs.readFileSync(path.join(__dirname, './settings.json')).toString()
        if (settingsFile) {
            settings = JSON.parse(settingsFile)
        }
    }

    let url: string = settings.mongo || 'mongodb://localhost:27017'
    
    if (MONGO_URL) {
        url = MONGO_URL
    }
    
    return {
        url, // 数据库链接
        poolSize: 30, // 数据库连接池最大连接数
        appDbName: 'fast-nest', // 数据库默认表名，如果获取collection时未填写db则会取该值
    }
}

export default config
