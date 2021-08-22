import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(execCtx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const handler = execCtx.getHandler().name;

    if (execCtx.getType() !== 'rpc') {
      return next.handle();
    }

    const incoming = `Intercepting incoming RPC request meant for ${handler}`;
    const outgoing = `Intercepting outgoing RPC request meant for ${handler}`;

    Logger.log(incoming, 'LoggingInterceptor');

    return next
      .handle()
      .pipe(tap(() => Logger.log(outgoing, 'LoggingInterceptor')));
  }
}
