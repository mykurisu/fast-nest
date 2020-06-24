import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'
import compression from 'compression'


import App from './app.module'
import { StandardRespInterceptor } from './common/interceptor/standardResp.interceptor'
import { ErrorFilter } from './common/filter/errorResp.filter'
import Config from './config'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(App);

    app.use(cookieParser());

    //  是否开启跨域配置
    app.enableCors();

    //  静态资源配置
    app.useStaticAssets(join(__dirname, 'uploads'), {
        prefix: '/static'
    })

    //  全局异常处理
    app.useGlobalFilters(new ErrorFilter())

    //  处理全局数据返回
    app.useGlobalInterceptors(new StandardRespInterceptor())

    //  开启Gzip压缩请求
    app.use(compression())

    await app.listen(Config.serverConfig.port);
}

bootstrap()
