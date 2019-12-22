import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'


@Controller('/user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('/create')
    async createUser(@Body('id') id: string, @Body('password') password: string, @Body('type') type?: string) {
        const res = this.userService.createUser(id, password, type)
        return Promise.resolve(res)
    }

    @Post('/login')
    async userLogin(@Body('id') id: string, @Body('password') password: string, @Body('type') type: string) {
        const res = this.userService.userLogin(id, password, type)
        return Promise.resolve(res)
    }

    @Post('/getUserInfo')
    async getUserInfo(@Body('token') token: string) {
        const res = this.userService.getUserInfo(token)
        return Promise.resolve(res)
    }
    
}

