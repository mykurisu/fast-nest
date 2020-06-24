import LRU from 'lru-cache'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { MyLogger } from './Logger.service'


@Injectable()
export class Cache {

    constructor(
        private readonly myLogger: MyLogger,
    ) {}

    private lruOptions: LRU.Options<any, any> = {
        max: 500,
        maxAge: 1000 * 60 * 5
    }

    private caches: LRU<any, any> = new LRU(this.lruOptions)

    public async cacheFactory(options: any, fn: Function) {
        const { cacheKey } = options
        if (!cacheKey) {
            throw new HttpException('CacheKey Not Found', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        let data = this.caches.get(cacheKey)
        if (!data) {
            data = await fn()
            this.caches.set(cacheKey, data)
            this.myLogger.log(`set cache ${cacheKey} ${JSON.stringify(data)}`, 'cacheFactory')
        } else {
            this.myLogger.log(`get cache ${cacheKey} ${JSON.stringify(data)}`, 'cacheFactory')
        }
        return data
    }
    
}
