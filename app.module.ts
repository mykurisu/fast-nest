import { Module } from '@nestjs/common'
import { CoreModule } from './modules/core.module'
import { ShareModule } from './modules/share.module'
import { FeatureModule } from './modules/feature.module'

@Module({
    imports: [ CoreModule, FeatureModule, ShareModule ]
})
export default class ApplicationModule {}