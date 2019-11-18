import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'


@Controller('/user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('/getUserInfo')
    async getUserInfo(@Body('uid') uid: string) {
        const res = this.userService.getUserInfo(uid)
        return Promise.resolve(res)
    }
    
}

