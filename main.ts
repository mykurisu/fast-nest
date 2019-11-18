import { NestFactory } from '@nestjs/core'
import App from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(App)

    await app.listen(9999);
}

bootstrap()
