import {
  Controller,
  Get,
  Inject,
  Logger,
  Scope,
  UseInterceptors,
} from '@nestjs/common';
import { ClientRedis, EventPattern } from '@nestjs/microservices';
import { LoggingInterceptor } from './logging.interceptor';

const eventPattern = 'event_pattern';

@Controller({
  scope: Scope.REQUEST
})
export class AppController {
  constructor(@Inject('REDIS_CLIENT') private redis: ClientRedis) {}

  @EventPattern(eventPattern)
  handler1(data) {
    Logger.log(data, 'Handler 1');
  }

  /** This will not be triggered unless we disable the interceptor or remove the other handler */
  @EventPattern(eventPattern)
  @UseInterceptors(LoggingInterceptor)
  handler2(data) {
    Logger.log(data, 'Handler 2');
  }

  @Get('ping')
  getPing() {
    this.redis.emit(eventPattern, 'NEW EVENT');

    return 'pong';
  }
}
