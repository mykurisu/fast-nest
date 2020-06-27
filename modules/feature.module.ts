import { Module } from '@nestjs/common'
import { HelloModule } from './hello/hello.module'
import { FileModule } from './file/file.module'


@Module({
    imports: [
        HelloModule,
        FileModule
    ]
})
export class FeatureModule {}
