import fs from 'fs'
import path from 'path'
import md5 from 'blueimp-md5'
import Config from '../../config'

import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { TencentCosService } from '../_common/TencentCos.service'
import { IFileResult } from '../../common/interface/index'


@Injectable()
export class FileService {

    constructor(
        private readonly tencentCosService: TencentCosService
    ) {}

    async handleUpload2Local(files: any[]) {
        try {
            const fileList: any[] = files.slice(0)
            const promises: Promise<any>[] = []
            const result: IFileResult[] = []
            fileList.forEach((file: any) => {
                const ext = file.originalname.split('.').slice(-1)[0]
                const fileName: string = `${md5(file.originalname)}.${ext}`
                const filePath = path.join(__dirname, '../../uploads/', fileName)
                const promise = new Promise((resolve) => {
                    fs.writeFile(filePath, file.buffer, {}, () => {
                        result.push({
                            name: file.originalname,
                            fileName,
                            serverPath: filePath,
                            path: `${Config.serverConfig.selfUrl}/static/${fileName}`,
                            size: file.size
                        })
                        resolve()
                    })
                })
                promises.push(promise)
            })
            await Promise.all(promises)
            return result
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async handleUpload2Cos(files: any[]) {
        try {
            const fileList = await this.handleUpload2Local(files)
            const promises: Promise<any>[] = []
            const result: IFileResult[] = []
            fileList.forEach((file: any) => {
                const Key = `static/${file.fileName}`
                const promise = new Promise((resolve, reject) => {
                    this.tencentCosService.getCosInstance().putObject({
                        Bucket: Config.cos.Bucket,
                        Region: Config.cos.Region,
                        Key,
                        ContentLength: file.size,
                        Body: fs.createReadStream(file.serverPath),
                    }, (err: any) => {
                        if (err) {
                            reject(err)
                        }
                        result.push({
                            name: file.name,
                            path: `${Config.cos.path}/static/${file.fileName}`,
                        })
                        resolve()
                    })
                })
                promises.push(promise)
            })
            await Promise.all(promises)
            return result
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
