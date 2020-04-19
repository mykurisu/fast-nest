import { MongoClient, MongoError } from 'mongodb'
import { Injectable, OnModuleInit, HttpException, HttpStatus, Logger } from '@nestjs/common'
import Config from '../../config'


const { url, poolSize, appDbName } = Config.mongo
@Injectable()
export class MongoService implements OnModuleInit {
    public connection: MongoClient | null = null

    async onModuleInit() {
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
                    Logger.error('MongoDB INIT FAIL', undefined, 'FastNest')
                    return reject(err)
                }
                this.connection = client
                Logger.log('MongoDB INITED', 'FastNest')
                resolve()
            })
        })
    }

}
