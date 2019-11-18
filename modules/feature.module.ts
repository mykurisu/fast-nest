import { Module } from '@nestjs/common'

import { TestModule } from './test/test.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [ TestModule, UserModule ]
})
export class FeatureModule {}
