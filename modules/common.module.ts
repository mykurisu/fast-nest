import { Module, Global, HttpModule } from '@nestjs/common'
import { Cache } from './_common/Cache.service'
import { Mongo } from './_common/Mongo.service'
import { MyLogger } from './_common/Logger.service'


@Global()
@Module({
    imports: [ HttpModule ],
    providers: [ Cache, Mongo, MyLogger ],
    exports: [ Cache, Mongo, MyLogger ]
})
export class CommonModule {}
