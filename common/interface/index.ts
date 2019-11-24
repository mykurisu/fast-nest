import { Request } from 'express'

export interface IConfig {
    cos: {
        SecretId: string,
        SecretKey: string,
        Bucket: string,
        Region: string,
        path: string
    },
    mongo: {
        url: string,
        poolSize: number,
    },
    url: string
}

export interface ISession {
    _id?: string,
    userName: string,
}

export interface IRequest extends Request {
    uSession: ISession 
}
