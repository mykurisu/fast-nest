import { Module, Global } from '@nestjs/common'
import { MongoService } from './_common/Mongo.service'


@Global()
@Module({
    providers: [ MongoService ],
    exports: [ MongoService ]
})
export class CommonModule {}
