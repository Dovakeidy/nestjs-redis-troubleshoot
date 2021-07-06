import {
  Inject,
  Logger,
  Module,
  OnApplicationBootstrap,
  Provider,
} from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientRedis,
  Transport,
} from '@nestjs/microservices';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

export const EVENT_NAME = 'EVENT_NAME';
export const NEST_REDIS = Symbol('NEST_REDIS');

export const RedisProvider: Provider = {
  provide: NEST_REDIS,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: { url: 'redis://localhost:6379' },
    }),
};

@Module({ providers: [RedisProvider] })
export class TransportModule implements OnApplicationBootstrap {
  constructor(@Inject(NEST_REDIS) private client: ClientRedis) {}

  onApplicationBootstrap(): any {
    this.client.connect().then(() => {
      Logger.log('REDIS is connected');
      this.startEmitting();
    });
  }

  startEmitting() {
    let msgNumber = 0;

    // Uncomment this to circumvent NestJS and manually setup the subscription
    // this.listen();

    // wait 3 secs, then start emitting every 8
    timer(3000, 8000)
      .pipe(
        tap(() => Logger.log(`Emitting message #${++msgNumber}`)),
        tap(() => this.client.emit(EVENT_NAME, { messageNumber: msgNumber })),
      )
      .subscribe();
  }

  listen() {
    this.client['subClient'].subscribe(EVENT_NAME);
    this.client['subClient'].on('message', (channel, message) => {
      console.log(`subClient received; channel=${channel}, message=${message}`);
    });
  }
}
