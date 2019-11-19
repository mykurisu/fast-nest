import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import moment from 'moment'
import chalk from 'chalk'
import bytes from 'bytes'


@Injectable()
export class LoggerMiddleware implements NestMiddleware<any, any> {
    async use(@Req() req: Request, @Res() res: Response, next: Function) {
        const startTime: number = Date.now()
        const url: string = req.baseUrl
        console.log(`[${req.method}] ${moment(startTime).format()} --> ${chalk.bold(url)}`)

        try {
            await next()
        } catch (error) {
            console.log(`[${req.method}] ${moment().format()} <-- ${chalk.red(String(res.statusCode))} ${chalk.bold(url)} error: ${error}`)
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
                length = bytes(l).toLowerCase()
            }
            console.log(`[${req.method}] ${moment(finishTime).format()} <-- ${chalk.green(String(statusCode))} ${chalk.bold(url)} ${chalk.bold((finishTime - startTime) + 'ms')} ${length}`)
        }

        res.once('finish', () => {
            onFinish()
            res.removeListener('finish', onFinish)
        })
    }
}
