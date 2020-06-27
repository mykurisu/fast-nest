import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import bytes from 'bytes'
import { logger } from '../../modules/_common/Logger.service'


@Injectable()
export class LoggerMiddleware implements NestMiddleware<any, any> {
    async use(@Req() req: Request, @Res() res: Response, next: Function) {
        const startTime: number = Date.now()
        const url: string = req.baseUrl
        logger.log(`[${req.method}] --> ${url}`, 'logger.middleware', false)

        try {
            await next()
        } catch (error) {
            logger.error(`[${req.method}] <-- ${res.statusCode} ${url}`, error, 'logger.middleware')
            throw error
        }

        const onFinish = () => {
            const finishTime: number = Date.now()
            const { statusCode } = res
            let length: string
            if (~[204, 205, 304].indexOf(statusCode)) {
                length = ''
            } else {
                const l = Number(res.getHeader('content-length'))
                length = bytes(l) ? bytes(l).toLowerCase() : ''
            }
            logger.log(`[${req.method}] <-- ${res.statusCode} ${url} ${(finishTime - startTime) + 'ms'}`, 'logger.middleware', false)
        }

        res.once('finish', () => {
            onFinish()
            res.removeListener('finish', onFinish)
        })
    }
}
