import cookieParser from 'cookie-parser'
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { APP_INTERCEPTOR,APP_FILTER } from '@nestjs/core'

import { LoggerMiddleware } from '../common/middleware/logger.middleware'
import { StandardRespInterceptor } from '../common/interceptor/standardResp.interceptor'
import { ErrorFilter } from '../common/filter/errorResp.filter'

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: StandardRespInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: ErrorFilter
        }
    ]
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware, cookieParser()).forRoutes('*')
    }
}
