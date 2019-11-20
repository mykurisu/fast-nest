import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'


@Controller('/file')
@UseInterceptors(FilesInterceptor('files'))
export class FileController {

    constructor(private readonly fileService: FileService) {}

    @Post('/uploadImage')
    async uploadImg(@UploadedFiles() files: Array<any>) {
        console.log(files)
        if (!files || files.length <= 0) {
            return Promise.reject('文件不能为空')
        }
        await this.fileService.handleUpload2Local(files)
        const path = ''
        return Promise.resolve({ path })
    }
    
}
