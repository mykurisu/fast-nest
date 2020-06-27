import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'


@Controller('/file')
@UseInterceptors(FileInterceptor('file'))
export class FileController {

    constructor(
        private readonly fileService: FileService
    ) {}

    @Post('/upload')
    async fileUpload(
        @UploadedFile() file: any,
    ) {
        const res = await this.fileService.fileUpload(file)
        return res
    }

}
