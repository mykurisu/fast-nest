import { Module, Global } from '@nestjs/common'
import { TencentCosService } from './_share/TencentCosService.service'


@Global()
@Module({
    providers: [ TencentCosService ],
    exports: [ TencentCosService ]
})
export class ShareModule {}
