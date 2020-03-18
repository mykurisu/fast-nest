import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { MongoService } from '../_common/Mongo.service'
import { CryptoService } from '../_common/crypto.service'
import { IUser } from '../../common/interface/index'
import { randomString } from '../../common/utils/index'


@Injectable()
export class UserService {

    constructor(
        private readonly mongoService: MongoService,
        private readonly cryptoService: CryptoService
    ) {}

    async createUser(id: string, password: string, type?: string) {
        try {
            const col = await this.mongoService.getCol('user')
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
                uid: randomString(8)
            }
            await col.insertOne(userInfo)

            const { uid } = userInfo
            userInfo.token = await this.createToken(uid)
            
            return { ...userInfo }
        } catch (e) {
            return Promise.reject(e)
        }
    }

    async userLogin(id: string, password: string, type?: string) {
        try {
            const col = await this.mongoService.getCol('user')
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
            const user: IUser | null = await col.findOne(q)
            if (!user) {
                return Promise.resolve({
                    status: -1000,
                    mesage: 'user or password error'
                })
            }

            const { uid } = user
            user.token = await this.createToken(uid)
            return { ...user }
        } catch (e) {
            return Promise.reject(e)
        }
    }

    async getUserInfo(token: string) {
        try {
            const [uid] = this.cryptoService.aesDecrypt(token).split('_')
            const col = await this.mongoService.getCol('user')
            if (!col) {
                throw new HttpException('DB ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const userInfo = await col.findOne({ uid })
            return Promise.resolve({ userInfo })
        } catch (e) {
            return Promise.reject(e)
        }
    }

    private async createToken(uid: string) {
        const userToken = this.cryptoService.aesEncrypt(`${uid}_${randomString(4)}`)
        const tokenCol = await this.mongoService.getCol('user_token')
        await tokenCol.updateOne({ uid }, {
            $set: {
                uid,
                userToken
            }
        }, {
            upsert: true
        })
        return userToken
    }
    
}
