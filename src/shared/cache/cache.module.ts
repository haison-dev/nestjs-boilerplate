import {
  CacheModule as CacheManagerModule,
  CacheOptions,
} from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import useCacheFactory from './cache.factory';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheManagerModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>
        (await useCacheFactory(config)) as unknown as CacheOptions,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
