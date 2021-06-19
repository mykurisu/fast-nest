import { Module, Global, HttpModule } from '@nestjs/common';
import { MyLogger } from '@mykurisu/fast-nest-logger';


@Global()
@Module({
    imports: [ HttpModule ],
    providers: [ MyLogger ],
    exports: [ MyLogger ]
})
export class CommonModule {}
