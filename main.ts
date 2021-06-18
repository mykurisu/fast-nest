import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'{{#if gzip}}
import compression from 'compression'{{/if}}


import App from './app.module'
import { StandardRespInterceptor } from './common/interceptor/standardResp.interceptor'
import { ErrorFilter } from './common/filter/errorResp.filter'
import Config from './config'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(App);

    app.use(cookieParser());

    {{#if cors}}
    //  是否开启跨域配置
    app.enableCors()
    {{/if}}

    //  静态资源配置
    app.useStaticAssets(join(__dirname, 'uploads'), {
        prefix: '/static'
    })

    //  全局异常处理
    app.useGlobalFilters(new ErrorFilter())

    //  处理全局数据返回
    app.useGlobalInterceptors(new StandardRespInterceptor())

    {{#if gzip}}
    //  是否开启压缩配置
    app.use(compression())
    {{/if}}

    await app.listen(Config.serverConfig.port);
}

bootstrap();
