import { Module } from '@nestjs/common'
import { CoreModule } from './modules/core.module'
import { CommonModule } from './modules/common.module'
import { FeatureModule } from './modules/feature.module'

@Module({
    imports: [
        CoreModule,
        FeatureModule,
        CommonModule,
    ]
})
export default class ApplicationModule {}
