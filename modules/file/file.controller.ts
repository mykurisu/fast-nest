import { Controller, Post } from '@nestjs/common'


@Controller('/file')
export class FileController {

    @Post('/upload')
    async upload() {
        return Promise.resolve()
    }
    
}

