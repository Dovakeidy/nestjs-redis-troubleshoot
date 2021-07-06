import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TransportModule } from './transport/transport.module';

@Module({
  imports: [TransportModule],
  controllers: [AppController],
})
export class AppModule {}
