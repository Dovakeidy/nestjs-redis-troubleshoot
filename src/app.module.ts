import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_CLIENT',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    Logger.log('Application Bootstrap', 'AppModule');
  }
}
