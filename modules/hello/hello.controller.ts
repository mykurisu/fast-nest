import { Controller, Get, Post } from '@nestjs/common'
import { HelloService } from './hello.service'
import { Cache } from '../_common/Cache.service'


@Controller('/hello')
export class HelloController {

    constructor(
        private readonly helloWorldService: HelloService,
        private readonly cache: Cache,
    ) {}

    @Get('/sayHello')
    async sayHello() {
        const res = await this.helloWorldService.sayHello()
        return res
    }

    @Post('/sayHi')
    async sayHi() {
        const res = await this.cache.cacheFactory({ cacheKey: 'cacheSayHi' }, () => {
            return this.helloWorldService.sayHello()
        })
        return res
    }
    
}

