import { MongoClient, MongoError } from 'mongodb'
import { Injectable, OnModuleInit, HttpException, HttpStatus } from '@nestjs/common'
import Config from '../../config'


const { url, poolSize, appDbName } = Config.mongo
@Injectable()
export class MongoService implements OnModuleInit {
    public connection: MongoClient | null = null

    onModuleInit() {
        MongoClient.connect(url, {
            poolSize,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err: MongoError, client: MongoClient | null) => {
            if (err) {
                console.log('MongoDB INIT FAIL')
                return console.log(err)
            }
            this.connection = client
            console.log('MongoDB INITED')
        })
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

}
