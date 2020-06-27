import path from 'path'
import fs from 'fs'
import md5 from 'blueimp-md5'
import { Injectable, OnModuleInit, HttpException, HttpStatus } from '@nestjs/common'
import { MyLogger } from '../_common/Logger.service'
import { ROOT_PATH, STATIC_PATH } from '../../common/constants/index'


@Injectable()
export class FileService implements OnModuleInit {

    private readonly uploadDirPath = path.join(ROOT_PATH, './uploads')

    constructor(
        private readonly myLogger: MyLogger
    ) {}

    onModuleInit() {
        fs.stat(this.uploadDirPath, (err) => {
            if (!err) {
                return
            }
            fs.mkdir(this.uploadDirPath, (err) => {
                if (err) this.myLogger.error(JSON.stringify(err), 'FileService-onModuleInit')
            })
        })
    }

    async fileUpload(file: any) {
        if (!file || !file.buffer) {
            throw new HttpException('fileData Not Found', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const ext = file.originalname.split('.').pop() || ''

        if (!ext) {
            throw new HttpException('ext Not Found', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const md5Str = md5(file.buffer.toString('base64'))

        const fileName = `${md5Str}.${ext}`

        fs.writeFileSync(path.join(this.uploadDirPath, fileName), file.buffer)

        return {
            path: `${STATIC_PATH}/${fileName}`
        }

    }

}
