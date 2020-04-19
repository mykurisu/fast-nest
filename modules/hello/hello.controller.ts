import { Controller, Get } from '@nestjs/common'
import { HelloService } from './hello.service'


@Controller('/hello')
export class HelloController {

    constructor(private readonly helloService: HelloService) {}

    @Get('/sayHello')
    async sayHello() {
        const res = await this.helloService.sayHello()
        return res
    }
    
}

