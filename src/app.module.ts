import {
  CACHE_MANAGER,
  CacheModule,
  Inject,
  Logger,
  Module,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { AppController } from './app.controller';
import * as redisStore from 'cache-manager-redis-store';
import { Cache } from 'cache-manager';
import { timer } from 'rxjs';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async onApplicationBootstrap() {
    // empty the cache
    Logger.log('Reset the cache');
    await this.cache.reset();
    const TTL_IS_NULL_KEY = 'TTL_IS_NULL_KEY';
    const TTL_IS_ZERO_KEY = 'TTL_IS_ZERO_KEY';
    const TTL_IS_NULL_VALUE = 'TTL_IS_NULL_VALUE';
    const TTL_IS_ZERO_VALUE = 'TTL_IS_ZERO_VALUE';

    await timer(5000).toPromise();

    Logger.log('Set cache items');
    await this.cache.set(TTL_IS_NULL_KEY, TTL_IS_NULL_VALUE, { ttl: null });
    await this.cache.set(TTL_IS_ZERO_KEY, TTL_IS_ZERO_VALUE, { ttl: 0 });
    await timer(5000).toPromise();

    Logger.log('Read cache');
    this.logResult(TTL_IS_NULL_KEY, await this.cache.get(TTL_IS_NULL_KEY));
    this.logResult(TTL_IS_ZERO_KEY, await this.cache.get(TTL_IS_ZERO_KEY));
  }

  private logResult(key, value) {
    if (value === undefined || value === null) {
      Logger.error(
        `Key ${key} was not in the cache. Value returned was ${value}`,
      );
    } else {
      Logger.log(`Key ${key} was read from the cache. Value is ${value}`);
    }
  }
}
