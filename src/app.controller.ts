import {
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  UseInterceptors,
} from '@nestjs/common';
import { ClientRedis, EventPattern } from '@nestjs/microservices';
import { LoggingInterceptor } from './logging.interceptor';

const eventPattern = 'event_pattern';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('REDIS_CLIENT') private redis: ClientRedis) {}

  onModuleInit(): any {
    this.redis.emit(eventPattern, 'NEW EVENT');
  }

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
    return 'pong';
  }
}
