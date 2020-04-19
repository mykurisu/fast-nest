import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import App from './app.module'
import Config from './config'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(App);

    await app.listen(Config.serverConfig.port, () => {
        console.log('======')
        console.log(`Your FastNest App At http://localhost:${Config.serverConfig.port}`)
        console.log('======')
    });
}

bootstrap()
