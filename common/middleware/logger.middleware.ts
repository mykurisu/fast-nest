import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import moment from 'moment'
import chalk from 'chalk'


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
            console.log(`[${req.method}] ${moment(finishTime).format()} <-- ${chalk.green(String(res.statusCode))} ${chalk.bold(url)} ${chalk.bold((finishTime - startTime) + 'ms')}`)
        }
        
        res.once('finish', () => {
            onFinish()
            res.removeListener('finish', onFinish)
        })
    }
}
