import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'


@Controller('/file')
@UseInterceptors(FilesInterceptor('files'))
export class FileController {

    @Post('/uploadImage')
    async uploadImg(@UploadedFiles() files: Array<any>) {
        if (!files || files.length <= 0) {
            return Promise.reject('文件不能为空')
        }
        const path = ''
        return Promise.resolve({ path })
    }
    
}
