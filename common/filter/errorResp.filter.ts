import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    InternalServerErrorException
} from '@nestjs/common'
import { logger } from '../../modules/_common/Logger.service'

@Catch()
export class ErrorFilter implements ExceptionFilter {
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
            logger.error(exception.message ? JSON.stringify(exception.message) : JSON.stringify(exception), '')
        } else {
            logger.error(String(exception), '')
        }
    }
}
