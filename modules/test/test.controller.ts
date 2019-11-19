import { Controller, Post, Get } from '@nestjs/common'
import { TencentCosService } from '../_share/TencentCosService.service'


@Controller('/test')
export class TestController {

    constructor(private readonly tencentCosService: TencentCosService) {}

    @Get()
    async getList() {
        return Promise.resolve({
            items: [
                {
                    name: 1,
                },
                {
                    name: 1,
                },
                {
                    name: 1,
                },
                {
                    name: 1,
                },
                {
                    name: 2
                }
            ],
        })
    }

    @Post('/cos')
    async getCos() {
        const cos = this.tencentCosService.getCosInstance()
        console.log(cos)
        return {}
    }
    
}

