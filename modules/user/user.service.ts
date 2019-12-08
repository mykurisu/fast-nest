import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { MongoService } from '../_common/Mongo.service'


@Injectable()
export class UserService {

    constructor(
        private readonly mongoService: MongoService
    ) {}

    async getUserInfo(uid: string) {
        try {
            const col = await this.mongoService.getCol('fast-nest', 'user')
            if (!col) {
                throw new HttpException('DB ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const userInfo = await col.findOne({ uid })
            return Promise.resolve({ userInfo })
        } catch (e) {
            return Promise.reject(e)
        }
    }
    
}
