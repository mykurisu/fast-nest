import { Module, Global } from '@nestjs/common'
import { TencentCosService } from './_common/TencentCos.service'
import { MongoService } from './_common/Mongo.service'
import { CryptoService } from './_share/crypto.service'


@Global()
@Module({
    providers: [ TencentCosService, MongoService, CryptoService ],
    exports: [ TencentCosService, MongoService, CryptoService ]
})
export class CommonModule {}
