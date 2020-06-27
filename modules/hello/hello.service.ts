import { Injectable } from '@nestjs/common'


@Injectable()
export class HelloService {
    async sayHello() {
        return {
            msg: new Date()
        }
    }
}
