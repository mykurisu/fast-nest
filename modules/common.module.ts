import { Module, Global, HttpModule } from '@nestjs/common';
import { MyLogger, CONFIG_OPTIONS } from '@mykurisu/fast-nest-logger';
import Config from '../config';


@Global()
@Module({
    imports: [ HttpModule ],
    providers: [
        {
            provide: CONFIG_OPTIONS,
            useValue: Config.logOptions,
        },
        MyLogger
    ],
    exports: [ MyLogger ]
})
export class CommonModule {}
