import crypto from 'crypto'
import { Injectable } from '@nestjs/common'
import Config from '../../config'


@Injectable()
export class CryptoService {
    aesEncrypt(content: string) {
        const cipher = crypto.createCipher('aes192', Config.cryptoStr)
        let crypted = cipher.update(content, 'utf8', 'hex')
        crypted += cipher.final('hex')
        return crypted
    }

    aesDecrypt(encryptedContent: string) {
        const decipher = crypto.createDecipher('aes192', Config.cryptoStr);
        let decrypted = decipher.update(encryptedContent, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    }

    hash(content: string) {
        const hash = crypto.createHash('md5')
        hash.update(content)
        return hash.digest('hex')
    }
}
