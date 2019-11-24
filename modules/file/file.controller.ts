import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'


@Controller('/file')
@UseInterceptors(FilesInterceptor('files'))
export class FileController {

    constructor(private readonly fileService: FileService) {}

    @Post('/upload2Local')
    async upload2Local(@UploadedFiles() files: Array<any>) {
        if (!files || files.length <= 0) {
            return Promise.reject('文件不能为空')
        }
        const fileList = await this.fileService.handleUpload2Local(files)
        return Promise.resolve({ fileList })
    }

    @Post('/upload2Cos')
    async upload2Cos(@UploadedFiles() files: Array<any>) {
        if (!files || files.length <= 0) {
            return Promise.reject('文件不能为空')
        }
        const fileList = await this.fileService.handleUpload2Cos(files)
        return Promise.resolve({ fileList })
    }
    
}
