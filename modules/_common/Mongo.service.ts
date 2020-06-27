import { MongoClient, MongoError } from 'mongodb'
import { Injectable, OnModuleInit, HttpException, HttpStatus } from '@nestjs/common'
import Config from '../../config'
import { MyLogger } from './Logger.service'


const { url, poolSize, appDbName } = Config.mongo || { url: '', poolSize: 0, appDbName: '' }
@Injectable()
export class Mongo implements OnModuleInit {

    constructor(
        private readonly myLogger: MyLogger
    ) {}

    public connection: MongoClient | null = null

    async onModuleInit() {
        if (!url) return
        await this.DBInit()
    }

    async getDB(db: string) {
        if (!this.connection) {
            throw new HttpException('DB ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return this.connection.db(db)
    }

    async getCol(collection: string, db?: string) {
        if (!this.connection) {
            throw new HttpException('DB ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        if (!db) {
            db = appDbName
        }
        const database = this.connection.db(db)
        if (!database) {
            throw new HttpException('DB ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return database.collection(collection)
    }

    private DBInit() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, {
                poolSize,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err: MongoError, client: MongoClient | null) => {
                if (err) {
                    this.myLogger.error('MongoDB INIT FAIL', JSON.stringify(err), 'MongoService')
                    reject(err)
                }
                this.connection = client
                this.myLogger.log('MongoDB INITED', 'MongoService')
                resolve()
            })
        })
    }

}
