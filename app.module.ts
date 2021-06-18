import { Module } from '@nestjs/common'
import { CoreModule } from './modules/core.module'
import { CommonModule } from './modules/common.module'
import { FeatureModule } from './modules/feature.module'{{#if feature_mongo}}
import { MongoModule } from '@mykurisu/fast-nest-mongo'{{/if}}{{#if feature_redis}}
import { RedisModule } from '@mykurisu/fast-nest-redis'{{/if}}

@Module({
    imports: [
        CoreModule,
        FeatureModule,
        CommonModule,{{#if feature_mongo}}
        MongoModule.register({ url: 'mongodb://localhost:27017', poolSize: 30, appDbName: 'fast-nest' }),{{/if}}{{#if feature_redis}}
        RedisModule.register({ url: '' }),{{/if}}
    ]
})
export default class ApplicationModule {}
