import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(res => {
        const { status, ...result } = res;
        context.switchToHttp().getResponse().statusCode = status;
        if (res.status >= 400) {
          return { message: result.message };
        }
        return result.body;
      }),
    );
  }
}
