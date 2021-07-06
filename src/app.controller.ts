import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { EVENT_NAME } from './transport/transport.module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(EVENT_NAME)
  onEvent(data: any) {
    Logger.log('Event received');
    Logger.log(data);
  }
}
