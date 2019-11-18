import { Controller, Post } from '@nestjs/common'


@Controller('/test')
export class TestController {

    @Post()
    async getList() {
        return Promise.resolve({
            items: [
                {
                    name: 1,
                },
                {
                    name: 2
                }
            ],
        })
    }
    
}

