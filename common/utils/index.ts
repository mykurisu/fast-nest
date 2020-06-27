import crypto from 'crypto'
import request, { UrlOptions, UriOptions, CoreOptions } from 'request'
import { logger } from '../../modules/_common/Logger.service'


const randomString = (length: number): string => {
    const defaultChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = '';
    for (let i = length; i > 0; --i) result += defaultChars[Math.floor(Math.random() * defaultChars.length)];
    return result;
}

const aesEncrypt = (data: string, key: string): string => {
    const cipher = crypto.createCipher('aes192', key);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

const aesDecrypt = (encrypted: string, key: string): string => {
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const promisify = (options: (UriOptions & CoreOptions) | (UrlOptions & CoreOptions)): Promise<any> => new Promise((resolve) => {
    request(options, (err: any, resp: any, body: any) => {
        if (err) {
            return logger.error('promisify请求异常', `[request] - promisify - error: \n${String(err)}`)
        }
        resolve(body)
    })
})

export {
    randomString,
    aesEncrypt,
    aesDecrypt,
    promisify
}
