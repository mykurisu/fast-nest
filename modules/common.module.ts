import { Module, Global } from '@nestjs/common'
import { TencentCosService } from './_common/TencentCos.service'
import { MongoService } from './_common/Mongo.service'


@Global()
@Module({
    providers: [ TencentCosService, MongoService ],
    exports: [ TencentCosService, MongoService ]
})
export class CommonModule {}
