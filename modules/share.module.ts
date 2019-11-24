import { Module, Global } from '@nestjs/common'
import { TencentCosService } from './_share/TencentCos.service'
import { MongoService } from './_share/Mongo.service'


@Global()
@Module({
    providers: [ TencentCosService, MongoService ],
    exports: [ TencentCosService, MongoService ]
})
export class ShareModule {}
