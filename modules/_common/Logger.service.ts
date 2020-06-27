import { LoggerService, Logger } from '@nestjs/common'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import _ from 'lodash'

let logLevel: string = 'verbose';
const transports: any[] = [];
logLevel = 'info';
transports.push(new DailyRotateFile({
    dirname: './logs',
    filename: 'app.log.INFO.%DATE%',
    datePattern: 'YYYY-MM-DD',
    maxSize: '1g',
}));
transports.push(new winston.transports.File({
    level: 'info',
    filename: './logs/app.log.INFO',
    maxsize: 1024 * 1024 * 1000 // 1000MB
}));
transports.push(new winston.transports.File({
    level: 'warn',
    filename: './logs/app.log.WARN',
    maxsize: 1024 * 1024 * 10 // 10MB
}));
transports.push(new winston.transports.File({
    level: 'error',
    filename: './logs/app.log.ERROR',
    maxsize: 1024 * 1024 * 10 // 10MB
}));

const winstonLogger = winston.createLogger({
    level: logLevel,
    transports,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.printf(({ timestamp, level, message, context = 'unknown' }) => {
            level = _.toUpper(level);
            const meta: any = { 'ws-request-id': '-', 'ws-loginid': '-' };
            return `${timestamp}\t${level}\t[${process.pid}]\t[${meta['ws-client-ip'] || '-'}]\t[${context}]\t[${meta['ws-request-id']},${meta['ws-loginid']},]\t[-]\t${message}`;
        }),
    ),
})

class MyLogger implements LoggerService {
    log(message: string, context?: string, isTimeDiffEnabled: boolean = true) {
        if (process.env.NODE_ENV === 'production') {
            winstonLogger.log('info', message, { context })
        } else {
            Logger.log(message, context, isTimeDiffEnabled)
        }
    }
    error(message: string, trace: string, context?: string) {
        Logger.error(message, trace, context)
        if (process.env.NODE_ENV === 'production') {
            winstonLogger.log('error', message, { context })
        }
    }
    warn(message: string, context?: string) {
        Logger.warn(message, context)
        if (process.env.NODE_ENV === 'production') {
            winstonLogger.log('warn', message, { context })
        }
    }
}

const logger = new MyLogger()

export {
    MyLogger,
    logger
}
