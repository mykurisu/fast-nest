import { Injectable } from '@nestjs/common'
import Config from '../../config'

@Injectable()
export class TencentCosService {
    private cosCache: any;
    private cdnCache: any;

    getCosInstance(): any {
        if (this.cosCache) {
            return this.cosCache
        }
        const cosSdk = require('cos-nodejs-sdk-v5')
        const { SecretId, SecretKey } = Config.cos
        const instance = new cosSdk({
            SecretId,
            SecretKey,
        })
        this.cosCache = instance
        return instance
    }

    getCdnInstance(): any {
        if (this.cdnCache) {
            return this.cdnCache
        }
        const cdnSdk = require('qcloudapi-sdk')
        const { SecretId, SecretKey } = Config.cos
        const instance = new cdnSdk({
            SecretId,
            SecretKey,
            serviceType: 'cdn',
            method: 'POST',
        })
        this.cdnCache = instance
        return instance
    }
}
