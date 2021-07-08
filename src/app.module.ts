import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    Logger.log('This is a log line', 'Log Context');
  }
}
