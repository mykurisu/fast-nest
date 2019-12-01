import { IConfig } from './common/interface'


const config: IConfig =  {
    cos: {
        SecretId: '',
        SecretKey: '',
        Bucket: 'xxx-123456',
        Region: 'ap-guangzhou',
        path: 'https://xxx.cos.ap-guangzhou.myqcloud.com'
    },
    mongo: {
        url: 'mongodb://localhost:27017',
        poolSize: 30
    },
    url: 'http://localhost:9999',
    cryptoStr: 'nest'
}

export default config
