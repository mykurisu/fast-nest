import { Module, Global, HttpModule } from '@nestjs/common'
import { MyLogger } from './_common/Logger.service'


@Global()
@Module({
    imports: [ HttpModule ],
    providers: [ MyLogger ],
    exports: [ MyLogger ]
})
export class CommonModule {}
