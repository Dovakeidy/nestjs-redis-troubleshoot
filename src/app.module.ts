import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: { url: 'redis://localhost:6379' },
        }),
    },
  ],
  controllers: [AppController],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    Logger.log('Application Bootstrap', 'AppModule');
  }
}
