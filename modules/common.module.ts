import { Module, Global } from '@nestjs/common'
import { TencentCosService } from './_common/TencentCos.service'
import { MongoService } from './_common/Mongo.service'
import { CryptoService } from './_common/crypto.service'
import { EmailService } from './_common/Email.service'


@Global()
@Module({
    providers: [ TencentCosService, MongoService, CryptoService, EmailService ],
    exports: [ TencentCosService, MongoService, CryptoService, EmailService ]
})
export class CommonModule {}
