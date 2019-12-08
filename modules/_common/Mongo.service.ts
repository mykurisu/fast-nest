import { MongoClient } from 'mongodb'
import { Injectable, OnModuleInit, HttpException, HttpStatus } from '@nestjs/common'
import Config from '../../config'


const { url, poolSize } = Config.mongo
@Injectable()
export class MongoService implements OnModuleInit {
    public connection: MongoClient | null = null

    onModuleInit() {
        MongoClient.connect(url, {
            poolSize,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) {
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

    async getCol(db: string, collection: string) {
        if (!this.connection) {
            throw new HttpException('DB ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const database = this.connection.db(db)
        if (!database) {
            throw new HttpException('DB ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return database.collection(collection)
    }

}
