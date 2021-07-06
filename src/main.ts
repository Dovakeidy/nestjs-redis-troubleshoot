import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await NestFactory.createMicroservice<RedisOptions>(AppModule, {
    transport: Transport.REDIS,
    options: { url: 'redis://localhost:6379' },
  });
  await app.listen(3000);
}
bootstrap();
