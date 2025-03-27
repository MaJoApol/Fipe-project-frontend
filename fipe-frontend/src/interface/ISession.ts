import { DefaultSession } from "next-auth";

export interface ISession extends DefaultSession{
    id?: string
    token: string
    refreshToken: string
    tokenTime: number
}