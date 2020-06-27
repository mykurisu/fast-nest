import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CODES } from '../constants'


interface Response<T> {
    data: T;
}

@Injectable()
export class StandardRespInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map(data => {
                return {
                    data,
                    code: CODES.SUCCESS,
                };
            }),
        );
    }
}
