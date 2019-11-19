import { Module } from '@nestjs/common'
import { FileController } from './file.controller'

@Module({
    controllers: [ FileController ],
    providers: []
})
export class FileModule {}
