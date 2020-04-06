import crypto from 'crypto-js'
import { Injectable } from '@nestjs/common'
import Config from '../../config'


@Injectable()
export class CryptoService {
    aesEncrypt(content: string) {
        return crypto.AES.encrypt(content, Config.cryptoStr).toString()
    }

    aesDecrypt(encryptedContent: string) {
        const bytes = crypto.AES.decrypt(encryptedContent, Config.cryptoStr);
        return bytes.toString(crypto.enc.Utf8);
    }

    hash(content: string) {
        const hash = crypto.HmacSHA1(content)
        return hash
    }
}
