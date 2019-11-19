import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'


@Controller('/file')
@UseInterceptors(FileInterceptor('file'))
class FileController {

    @Post('/uploadImage')
    async uploadImg(@UploadedFile() file: any) {
        if (!file) {
            return Promise.reject('文件不能为空')
        }
        const path = ''
        return Promise.resolve({ path })
    }
    
}

export default FileController
