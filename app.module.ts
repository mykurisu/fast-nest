import { Module } from '@nestjs/common'
import { CoreModule } from './modules/core.module'
import { FeatureModule } from './modules/feature.module'

@Module({
    imports: [ CoreModule, FeatureModule ]
})
export default class ApplicationModule {}