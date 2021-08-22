import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ClientRedis, EventPattern } from '@nestjs/microservices';

const eventPattern = 'event_pattern';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('REDIS_CLIENT') private redis: ClientRedis) {}

  onModuleInit(): any {
    Logger.log('onModuleInit', 'AppController');
    this.redis.emit(eventPattern, 'NEW EVENT');
  }

  @EventPattern(eventPattern)
  onPriceUpdate(data) {
    Logger.log(data, 'Event Handler');
  }
}
