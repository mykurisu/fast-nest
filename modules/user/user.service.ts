import { Injectable } from '@nestjs/common'


@Injectable()
export class UserService {
    async getUserInfo(uid: string) {
        try {
            const users = require('./user.json')
            const index = users.findIndex((u: any) => u.uid === uid)
            const user = index > -1 ? users[index] : {}
            return Promise.resolve(user)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
