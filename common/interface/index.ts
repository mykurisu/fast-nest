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
    url: string,
    cryptoStr: string,
}

export interface ISession {
    _id?: string,
    userName: string,
}

export interface IRequest extends Request {
    uSession: ISession 
}

export interface IUser {
    id: string,
    password: string,
    uid: string,
    email: string,
    phone: string
}
