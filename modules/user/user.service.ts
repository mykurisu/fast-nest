import { Injectable, HttpException, HttpStatus, OnModuleInit } from '@nestjs/common'
import { MongoService } from '../_common/Mongo.service'
import { CryptoService } from '../_common/crypto.service'
import { EmailService } from '../_common/Email.service'
import { IUser } from '../../common/interface/index'
import { randomString } from '../../common/utils/index'
import Config from '../../config'


@Injectable()
export class UserService implements OnModuleInit {

    constructor(
        private readonly mongoService: MongoService,
        private readonly cryptoService: CryptoService,
        private readonly emailService: EmailService,
    ) {}

    async onModuleInit() {
        const col = await this.mongoService.getCol('user')
        const stats = await col.stats()
        let needCreateIndex = false
        if (stats.totalIndexSize < 1) {
            needCreateIndex = true
        } else {
            const hasUniq = await col.indexExists("username_1")
            if (!hasUniq) {
                needCreateIndex = true
            }
        }

        if (needCreateIndex) {
            console.log('user collection createIndex username')
            await col.createIndex({ "username": 1 }, { unique: true })
        }
    }


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

    async sendCode(mail: string) {
        try {
            const from: string = ''
            const subject: string = ''
            const { emailSettings } = Config
            const { emailCode = '' } = emailSettings || {}
            const authCode = emailCode
            const authUrl = this.cryptoService.aesEncrypt(`${authCode}_${Date.now() + 300000}`)
            const url = `${Config.serverConfig.selfUrl}/user/validAuthUrl?authUrl=${encodeURIComponent(authUrl)}`
            const content = {
                text: `${url} 请访问验证链接完成邮箱注册，谢谢！`,
                html: `<a href=${url} target="_blank">${url}</a> 请访问验证链接完成邮箱注册，谢谢！`
            }
            await this.emailService.sendEmail(mail, content, from, subject)
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    }

    async validAuthUrl(authUrl: string) {
        if (!authUrl) {
            return Promise.reject('邮件验证有误')
        }
        authUrl = decodeURIComponent(authUrl)
        const { emailSettings } = Config
        const { emailCode = '' } = emailSettings || {}
        const [ authCode, expiredTime ] = this.cryptoService.aesDecrypt(authUrl).split('_')
        if (emailCode !== authCode) {
            return Promise.reject('邮件验证秘钥有误')
        }
        if (+expiredTime < Date.now()) {
            return Promise.reject('验证链接已过期')
        }
        return Promise.resolve()
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
