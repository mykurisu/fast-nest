import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { MongoService } from '../_share/Mongo.service'
import { CryptoService } from '../_share/crypto.service'
import { IUser } from '../../common/interface/index'


@Injectable()
export class UserService {

    constructor(
        private readonly mongoService: MongoService,
        private readonly cryptoService: CryptoService
    ) {}

    async createUser(id: string, password: string, type?: string) {
        try {
            const col = await this.mongoService.getCol('fast-nest', 'user')
            if (!col) {
                throw new HttpException('DB ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
            }

            const hasID = await col.findOne({ id })
            if (hasID) {
                return Promise.resolve({
                    status: -1000,
                    mesage: 'this user is existed'
                })
            }

            const userInfo: IUser = {
                id: type ? '' : id,
                email: type === 'email' ? id : '',
                phone: type === 'phone' ? id : '',
                password: this.cryptoService.aesEncrypt(password),
                uid: this.cryptoService.hash(id)
            }
            await col.insertOne(userInfo)
            delete userInfo.password
            return userInfo
        } catch (e) {
            return Promise.reject(e)
        }
    }

    async userLogin(id: string, password: string, type?: string) {
        try {
            const col = await this.mongoService.getCol('fast-nest', 'user')
            if (!col) {
                throw new HttpException('DB ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
            }

            const q: { [key: string]: any } = {
                password: this.cryptoService.aesEncrypt(password)
            }
            if (type) {
                q[type] = id
            } else {
                q.id = id
            }
            const user = await col.findOne(q)
            if (!user) {
                return Promise.resolve({
                    status: -1000,
                    mesage: 'user or password error'
                })
            }
        } catch (e) {
            return Promise.reject(e)
        }
    }

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
