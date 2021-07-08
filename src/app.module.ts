import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    return;
  }
}
