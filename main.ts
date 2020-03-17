import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import App from './app.module'
import Config from './config'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(App);

    app.enableCors()

    app.useStaticAssets(join(__dirname, 'uploads'), {
        prefix: '/static'
    })

    await app.listen(Config.serverConfig.port);
}

bootstrap()
