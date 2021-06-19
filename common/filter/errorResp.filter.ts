import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    InternalServerErrorException
} from '@nestjs/common';
import { MyLogger } from '@mykurisu/fast-nest-logger';
import Config from '../../config';


@Catch()
export class ErrorFilter implements ExceptionFilter {
    private myLogger: MyLogger = new MyLogger(Config.logOptions || {})

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        if (exception instanceof HttpException || exception instanceof InternalServerErrorException) {
            const message = exception.message
            const code = exception.getStatus()
            const errorResponse = {
                msg: code === 403 ? '暂无权限访问' : '请求失败',
                message,
                code,
                url: request.originalUrl,
            };
            response.status(200);
            response.header('Content-Type', 'application/json; charset=utf-8');
            response.send(errorResponse);
        }

        if (exception && typeof(exception) === 'object') {
            this.myLogger.error(exception.message ? JSON.stringify(exception.message) : JSON.stringify(exception), '')
        } else {
            this.myLogger.error(String(exception), '')
        }
    }
}
