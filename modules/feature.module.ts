import { Module } from '@nestjs/common'

import { TestModule } from './test/test.module'
import { UserModule } from './user/user.module'
import { FileModule } from './file/file.module'

@Module({
    imports: [
        TestModule,
        UserModule,
        FileModule
    ]
})
export class FeatureModule {}
