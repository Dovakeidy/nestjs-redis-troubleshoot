import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EVENT_NAME } from './transport/transport.module';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'getHello Response';
  }

  @EventPattern(EVENT_NAME)
  onEvent(data: any) {
    Logger.log('Event received');
    Logger.log(data);
  }
}
