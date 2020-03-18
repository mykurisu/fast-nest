import { Request } from 'express'

export interface IConfig {
    serverConfig: {
        port: number
    }
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
        appDbName: string,
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
    phone: string,
    token?: string
}

export interface IFileResult {
    name: string,
    fileName?: string,
    serverPath?: string,
    path: string,
    size?: number
}