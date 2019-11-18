import { Request } from 'express'

export interface ISession {
    _id?: string,
    userName: string,
}

export interface IRequest extends Request {
    uSession: ISession 
}
